import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  type ChangeEventHandler,
  type ClipboardEvent,
  type ClipboardEventHandler,
  type CompositionEvent,
  type CompositionEventHandler,
  type DragEventHandler,
  type FocusEventHandler,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type MouseEvent,
  type MouseEventHandler,
  type RefObject,
  type SyntheticEvent,
} from "react";

/** 표시 문자열에서 세그먼트가 차지하는 [start, end) 범위 */
export type SegmentRange = [start: number, end: number];

/** 위아래 방향키로 값을 올리거나 내리는 방향 */
export type SegmentStep = 1 | -1;

/** Home, End로 옮겨 갈 세그먼트 값의 끝 */
export type SegmentEdge = "first" | "last";

type DeleteDirection = "backward" | "forward";

export interface SegmentEditState<TKind extends string, TSegments, TPending> {
  segments: TSegments;
  active: TKind;
  /** 아직 확정되지 않은 입력. 세그먼트를 옮기거나 포커스를 잃으면 버린다. */
  pending: TPending | null;
}

/**
 * 세그먼트 종류 `TKind`, 세그먼트 상태 `TSegments`, 확정 전 입력 `TPending`으로 표기 형식 하나의 편집 규칙을 정의한다.
 * 받아들이지 않는 입력은 모두 null로 알린다.
 */
export interface SegmentedInputRules<TKind extends string, TSegments, TPending> {
  /** 표시 순서대로 나열한 세그먼트 종류 */
  kinds: readonly TKind[];
  /** 모든 세그먼트가 비어 있는 상태 */
  empty: TSegments;
  getRange: (kind: TKind) => SegmentRange;
  format: (segments: TSegments, pending: TPending | null) => string;
  hasInput: (segments: TSegments, pending: TPending | null) => boolean;
  /** 값을 세그먼트로 바꾼다. 해석할 수 없으면 null이다. */
  parseValue: (value: string) => TSegments | null;
  /** 세그먼트를 값으로 바꾼다. 입력이 완성되지 않았으면 빈 문자열이다. */
  toValue: (segments: TSegments) => string;
  /** 붙여넣은 텍스트를 해석한다. 해석할 수 없으면 null이다. */
  parseText: (text: string) => TSegments | null;
  /** 글자 하나를 편집 상태에 적용한다. 받아들이지 않는 글자면 null이다. */
  applyCharacter: (
    state: SegmentEditState<TKind, TSegments, TPending>,
    char: string,
  ) => SegmentEditState<TKind, TSegments, TPending> | null;
  /** 세그먼트를 비운다. 지울 내용이 없으면 null이다. */
  clear: (segments: TSegments, kind: TKind) => TSegments | null;
  /** 위아래 방향키 증감 */
  step: (segments: TSegments, kind: TKind, delta: SegmentStep) => TSegments;
  /** Home, End로 세그먼트를 첫 값이나 마지막 값으로 바꾼다. */
  setToEdge: (segments: TSegments, kind: TKind, edge: SegmentEdge) => TSegments;
}

interface UseSegmentedInputOptions<TKind extends string, TSegments, TPending> {
  inputRef: RefObject<HTMLInputElement | null>;
  rules: SegmentedInputRules<TKind, TSegments, TPending>;
  /** 입력이 완성되지 않았으면 빈 문자열이다. */
  value: string;
  onValueChange: (value: string) => void;
  /** false면 포커스와 세그먼트 이동만 허용하고 값은 바꾸지 않는다. */
  isEditable: boolean;
}

/** input에 그대로 연결하는 이벤트 핸들러 */
interface SegmentedInputHandlers {
  onFocus: FocusEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onMouseDown: MouseEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onCompositionEnd: CompositionEventHandler<HTMLInputElement>;
  onPaste: ClipboardEventHandler<HTMLInputElement>;
  onCut: ClipboardEventHandler<HTMLInputElement>;
  onDrop: DragEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

interface UseSegmentedInputResult {
  /** input에 표시할 문자열. 포커스도 입력도 없으면 빈 문자열이라 placeholder가 보인다. */
  displayValue: string;
  /** 채워진 세그먼트가 하나도 없는지 여부 */
  isEmpty: boolean;
  /** 폼 초기화처럼 부분 입력까지 버리고 값에서 세그먼트를 다시 만들 때 호출한다. */
  resetSegments: (value: string) => void;
  handlers: SegmentedInputHandlers;
}

const parseOrEmpty = <TKind extends string, TSegments, TPending>(
  rules: SegmentedInputRules<TKind, TSegments, TPending>,
  value: string,
): TSegments => rules.parseValue(value) ?? rules.empty;

/**
 * @description 텍스트 input 하나로 여러 세그먼트를 편집한다.
 * 선택 영역으로 현재 세그먼트를 강조하고, 입력 문자는 모두 가로채 세그먼트 상태로만 반영한다.
 * 모든 세그먼트가 채워졌을 때만 값을 알리고, 부분 입력은 내부 상태로만 유지한다.
 */
export const useSegmentedInput = <TKind extends string, TSegments, TPending>({
  inputRef,
  rules,
  value,
  onValueChange,
  isEditable,
}: UseSegmentedInputOptions<TKind, TSegments, TPending>): UseSegmentedInputResult => {
  const { kinds } = rules;
  const firstKind = kinds[0];
  const lastKind = kinds[kinds.length - 1];

  const [segments, setSegments] = useState(() => parseOrEmpty(rules, value));
  const [active, setActive] = useState<TKind>(firstKind);
  const [pending, setPending] = useState<TPending | null>(null);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [, requestSelectionSync] = useReducer((key: number) => key + 1, 0);

  const segmentsRef = useRef(segments);
  const isPointerSelectingRef = useRef(false);

  const hasInput = rules.hasInput(segments, pending);

  useLayoutEffect(() => {
    segmentsRef.current = segments;
  }, [segments]);

  // 외부에서 값이 바뀌면 세그먼트를 다시 만든다. 부분 입력 중에는 값이 빈 문자열이므로 입력을 유지한다.
  useLayoutEffect(() => {
    const current = segmentsRef.current;
    if (rules.toValue(current) === value) return;
    if (value === "" && rules.hasInput(current, null)) return;

    const next = parseOrEmpty(rules, value);
    segmentsRef.current = next;
    setSegments(next);
    setPending(null);
  }, [value, rules]);

  // 렌더마다 표시 문자열이 바뀌면 브라우저가 선택 영역을 끝으로 옮기므로 현재 세그먼트를 다시 선택한다.
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!isFocused || input == null || isPointerSelectingRef.current) return;
    if (input.ownerDocument.activeElement !== input) return;

    const [start, end] = isAllSelected ? [0, input.value.length] : rules.getRange(active);
    if (input.selectionStart !== start || input.selectionEnd !== end) {
      input.setSelectionRange(start, end);
    }
  });

  const commit = (next: TSegments) => {
    segmentsRef.current = next;
    setSegments(next);
    onValueChange(rules.toValue(next));
  };

  const selectSegment = (kind: TKind) => {
    setActive(kind);
    setPending(null);
    setIsAllSelected(false);
  };

  const moveBy = (offset: SegmentStep) => {
    const index = Math.min(Math.max(kinds.indexOf(active) + offset, 0), kinds.length - 1);
    selectSegment(kinds[index]);
  };

  // 값을 바꾸는 동작은 아래 네 함수만 거친다.
  // 편집할 수 없는 상태면 아무것도 하지 않으므로 호출부에서는 따로 확인하지 않는다.
  const replaceSegments = (next: TSegments) => {
    if (!isEditable) return;

    commit(next);
    setPending(null);
    setIsAllSelected(false);
  };

  const clearAll = () => {
    if (!isEditable) return;

    commit(rules.empty);
    selectSegment(firstKind);
  };

  // 한 번에 여러 글자가 들어올 수 있으므로(자동 완성, 음성 입력 등) 글자마다 순서대로 적용한 뒤 한 번에 반영한다.
  // 전체 선택 상태에서 입력하면 모두 비우고 첫 세그먼트부터 채운다.
  const inputText = (text: string) => {
    if (!isEditable) return;

    let state: SegmentEditState<TKind, TSegments, TPending> = isAllSelected
      ? { segments: rules.empty, active: firstKind, pending: null }
      : { segments, active, pending };
    let isAccepted = false;

    for (const char of text) {
      const next = rules.applyCharacter(state, char);
      if (next == null) continue;

      state = next;
      isAccepted = true;
    }

    if (!isAccepted) return;

    commit(state.segments);
    setActive(state.active);
    setPending(state.pending);
    setIsAllSelected(false);
  };

  const deleteSelection = (direction: DeleteDirection) => {
    if (!isEditable) return;

    if (isAllSelected) {
      clearAll();
      return;
    }

    const cleared = rules.clear(segments, active);
    const hasContent = cleared != null || pending != null;
    if (hasContent) {
      commit(cleared ?? segments);
      setPending(null);
      return;
    }

    if (direction === "backward") moveBy(-1);
  };

  const handleNativeBeforeInputRef = useRef<(event: InputEvent) => void>(() => {});

  useLayoutEffect(() => {
    // 가상 키보드는 keydown이 "Unidentified"로 들어오므로 실제 입력 내용은 beforeinput에서 받는다.
    // 한글 조합 입력은 취소할 수 없어 compositionend에서 처리한다.
    handleNativeBeforeInputRef.current = event => {
      if (event.isComposing || event.inputType.startsWith("insertComposition")) return;

      event.preventDefault();

      if (event.inputType.startsWith("delete")) {
        deleteSelection(event.inputType.includes("Forward") ? "forward" : "backward");
        return;
      }

      const data = event.data ?? "";
      const parsed = data.length > 1 ? rules.parseText(data) : null;
      if (parsed != null) {
        replaceSegments(parsed);
        return;
      }

      inputText(data);
    };
  });

  useEffect(() => {
    const input = inputRef.current;
    if (input == null) return;

    const listener = (event: InputEvent) => handleNativeBeforeInputRef.current(event);
    input.addEventListener("beforeinput", listener);
    return () => input.removeEventListener("beforeinput", listener);
  }, [inputRef]);

  // 포인터로 포커스했다면 세그먼트는 mouseup에서 정한다.
  const handleFocus = () => {
    setIsFocused(true);
    selectSegment(isPointerSelectingRef.current ? active : firstKind);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setPending(null);
    setIsAllSelected(false);
  };

  const getKindAt = (position: number) =>
    kinds.find(kind => position <= rules.getRange(kind)[1]) ?? lastKind;

  // 포인터로 누른 위치의 세그먼트를 선택한다. 드래그가 input 밖에서 끝날 수 있어 document에서 받는다.
  const handleMouseDown = (event: MouseEvent<HTMLInputElement>) => {
    if (event.button !== 0) return;

    const input = event.currentTarget;
    // 비어 있는 필드는 표시 문자열이 없어 누른 위치에 뜻이 없다. 첫 세그먼트부터 입력하게 한다.
    const isPlaceholderShown = !isFocused && !hasInput;
    isPointerSelectingRef.current = true;

    input.ownerDocument.addEventListener(
      "mouseup",
      () => {
        // 선택된 세그먼트 안을 누르면 브라우저가 mouseup 기본 동작에서 캐럿을 다시 놓는다.
        // 그 뒤에 세그먼트를 선택하도록 다음 태스크로 미룬다.
        setTimeout(() => {
          isPointerSelectingRef.current = false;
          selectSegment(isPlaceholderShown ? firstKind : getKindAt(input.selectionStart ?? 0));
          requestSelectionSync();
        }, 0);
      },
      { once: true },
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    const isSelectAllKey = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a";
    if (isSelectAllKey) {
      event.preventDefault();
      setPending(null);
      setIsAllSelected(true);
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight": {
        event.preventDefault();
        const isForward = event.key === "ArrowRight";
        // 전체 선택에서는 선택 영역의 양 끝 세그먼트로 간다.
        if (isAllSelected) selectSegment(isForward ? lastKind : firstKind);
        else moveBy(isForward ? 1 : -1);
        return;
      }
      case "ArrowUp":
      case "ArrowDown":
        event.preventDefault();
        replaceSegments(rules.step(segments, active, event.key === "ArrowUp" ? 1 : -1));
        return;
      case "Home":
      case "End":
        event.preventDefault();
        replaceSegments(rules.setToEdge(segments, active, event.key === "Home" ? "first" : "last"));
        return;
      case "Backspace":
      case "Delete":
        event.preventDefault();
        deleteSelection(event.key === "Backspace" ? "backward" : "forward");
        return;
    }

    const isCharacterKey =
      event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey;
    if (isCharacterKey) {
      event.preventDefault();
      inputText(event.key);
    }
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    inputText(event.data);
    requestSelectionSync();
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const parsed = rules.parseText(event.clipboardData.getData("text"));
    if (parsed != null) replaceSegments(parsed);
  };

  const preventEdit = (event: SyntheticEvent) => event.preventDefault();

  // 표시 문자열은 세그먼트 상태에서만 만든다. 조합 입력 등으로 DOM 값이 바뀌어도 다음 렌더에서 되돌린다.
  const handleChange = () => requestSelectionSync();

  const resetSegments = useCallback(
    (nextValue: string) => {
      const next = parseOrEmpty(rules, nextValue);
      segmentsRef.current = next;
      setSegments(next);
      setPending(null);
      setIsAllSelected(false);
    },
    [rules],
  );

  return {
    displayValue: isFocused || hasInput ? rules.format(segments, pending) : "",
    isEmpty: !hasInput,
    resetSegments,
    handlers: {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onMouseDown: handleMouseDown,
      onKeyDown: handleKeyDown,
      onCompositionEnd: handleCompositionEnd,
      onPaste: handlePaste,
      onCut: preventEdit,
      onDrop: preventEdit,
      onChange: handleChange,
    },
  };
};
