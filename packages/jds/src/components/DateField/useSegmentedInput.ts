import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  type ClipboardEvent,
  type CompositionEvent,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
  type SyntheticEvent,
} from "react";

export interface SegmentEditState<K extends string, S, P> {
  segments: S;
  active: K;
  /** 아직 확정되지 않은 입력. 세그먼트를 옮기거나 포커스를 잃으면 버린다. */
  pending: P | null;
}

/**
 * 세그먼트 종류 `K`, 세그먼트 상태 `S`, 확정 전 입력 `P`로 표기 형식 하나의 편집 규칙을 정의한다.
 * 받아들이지 않는 입력은 모두 null로 알린다.
 */
export interface SegmentedInputRules<K extends string, S, P> {
  /** 표시 순서대로 나열한 세그먼트 종류 */
  kinds: readonly K[];
  /** 모든 세그먼트가 비어 있는 상태 */
  empty: S;
  /** 표시 문자열에서 세그먼트가 차지하는 [start, end) 범위 */
  getRange: (kind: K) => [number, number];
  format: (segments: S, pending: P | null) => string;
  hasInput: (segments: S, pending: P | null) => boolean;
  /** 값을 세그먼트로 바꾼다. 해석할 수 없으면 null이다. */
  parseValue: (value: string) => S | null;
  /** 세그먼트를 값으로 바꾼다. 입력이 완성되지 않았으면 빈 문자열이다. */
  toValue: (segments: S) => string;
  /** 붙여넣은 텍스트를 해석한다. 해석할 수 없으면 null이다. */
  parseText: (text: string) => S | null;
  /** 글자 하나를 편집 상태에 적용한다. 받아들이지 않는 글자면 null이다. */
  applyCharacter: (
    state: SegmentEditState<K, S, P>,
    char: string,
  ) => SegmentEditState<K, S, P> | null;
  /** 세그먼트를 비운다. 지울 내용이 없으면 null이다. */
  clear: (segments: S, kind: K) => S | null;
  /** 위아래 방향키 증감 */
  step: (segments: S, kind: K, delta: 1 | -1) => S;
  /** Home, End로 세그먼트를 첫 값이나 마지막 값으로 바꾼다. */
  setToEdge: (segments: S, kind: K, edge: "first" | "last") => S;
}

interface UseSegmentedInputOptions<K extends string, S, P> {
  inputRef: RefObject<HTMLInputElement | null>;
  rules: SegmentedInputRules<K, S, P>;
  /** 입력이 완성되지 않았으면 빈 문자열이다. */
  value: string;
  onValueChange: (value: string) => void;
  /** false면 포커스와 세그먼트 이동만 허용하고 값은 바꾸지 않는다. */
  isEditable: boolean;
}

const parseOrEmpty = <K extends string, S, P>(rules: SegmentedInputRules<K, S, P>, value: string) =>
  rules.parseValue(value) ?? rules.empty;

/**
 * @description 텍스트 input 하나로 여러 세그먼트를 편집한다.
 * 선택 영역으로 현재 세그먼트를 강조하고, 입력 문자는 모두 가로채 세그먼트 상태로만 반영한다.
 * 모든 세그먼트가 채워졌을 때만 값을 알리고, 부분 입력은 내부 상태로만 유지한다.
 */
export const useSegmentedInput = <K extends string, S, P>({
  inputRef,
  rules,
  value,
  onValueChange,
  isEditable,
}: UseSegmentedInputOptions<K, S, P>) => {
  const { kinds } = rules;
  const firstKind = kinds[0];
  const lastKind = kinds[kinds.length - 1];

  const [segments, setSegments] = useState(() => parseOrEmpty(rules, value));
  const [active, setActive] = useState<K>(firstKind);
  const [pending, setPending] = useState<P | null>(null);
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

  const commit = (next: S) => {
    segmentsRef.current = next;
    setSegments(next);
    onValueChange(rules.toValue(next));
  };

  const selectSegment = (kind: K) => {
    setActive(kind);
    setPending(null);
    setIsAllSelected(false);
  };

  const moveBy = (offset: 1 | -1) => {
    const index = Math.min(Math.max(kinds.indexOf(active) + offset, 0), kinds.length - 1);
    selectSegment(kinds[index]);
  };

  // 값을 바꾸는 동작은 아래 네 함수만 거친다.
  // 편집할 수 없는 상태면 아무것도 하지 않으므로 호출부에서는 따로 확인하지 않는다.
  const replaceSegments = (next: S) => {
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

    let state: SegmentEditState<K, S, P> = isAllSelected
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

  const deleteSelection = (direction: "backward" | "forward") => {
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

  const handleNativeBeforeInputRef = useRef<(e: InputEvent) => void>(() => {});

  useLayoutEffect(() => {
    // 가상 키보드는 keydown이 "Unidentified"로 들어오므로 실제 입력 내용은 beforeinput에서 받는다.
    // 한글 조합 입력은 취소할 수 없어 compositionend에서 처리한다.
    handleNativeBeforeInputRef.current = e => {
      if (e.isComposing || e.inputType.startsWith("insertComposition")) return;

      e.preventDefault();

      if (e.inputType.startsWith("delete")) {
        deleteSelection(e.inputType.includes("Forward") ? "forward" : "backward");
        return;
      }

      const data = e.data ?? "";
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

    const listener = (e: Event) => handleNativeBeforeInputRef.current(e as InputEvent);
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
  const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => {
    if (e.button !== 0) return;

    const input = e.currentTarget;
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    const isSelectAllKey = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "a";
    if (isSelectAllKey) {
      e.preventDefault();
      setPending(null);
      setIsAllSelected(true);
      return;
    }

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowRight": {
        e.preventDefault();
        const isForward = e.key === "ArrowRight";
        // 전체 선택에서는 선택 영역의 양 끝 세그먼트로 간다.
        if (isAllSelected) selectSegment(isForward ? lastKind : firstKind);
        else moveBy(isForward ? 1 : -1);
        return;
      }
      case "ArrowUp":
      case "ArrowDown":
        e.preventDefault();
        replaceSegments(rules.step(segments, active, e.key === "ArrowUp" ? 1 : -1));
        return;
      case "Home":
      case "End":
        e.preventDefault();
        replaceSegments(rules.setToEdge(segments, active, e.key === "Home" ? "first" : "last"));
        return;
      case "Backspace":
      case "Delete":
        e.preventDefault();
        deleteSelection(e.key === "Backspace" ? "backward" : "forward");
        return;
    }

    const isCharacterKey = e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey;
    if (isCharacterKey) {
      e.preventDefault();
      inputText(e.key);
    }
  };

  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    inputText(e.data);
    requestSelectionSync();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const parsed = rules.parseText(e.clipboardData.getData("text"));
    if (parsed != null) replaceSegments(parsed);
  };

  const preventEdit = (e: SyntheticEvent) => e.preventDefault();

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
