import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type Ref,
} from "react";

interface RovingFocusContextValue {
  tabStopId: string | null;
  onItemUnmount: (id: string) => void;
}

interface RovingFocusContainerProps<T extends HTMLElement> {
  ref: Ref<T>;
  onKeyDown: (event: KeyboardEvent<T>) => void;
  onFocus: (event: FocusEvent<T>) => void;
  "data-roving-container": string;
}

interface RovingFocusGroup<T extends HTMLElement> {
  containerProps: RovingFocusContainerProps<T>;
  contextValue: RovingFocusContextValue;
}

const RovingFocusContext = createContext<RovingFocusContextValue | null>(null);

export const RovingFocusProvider = RovingFocusContext.Provider;

const NAVIGATION_KEYS = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];

/**
 * DOM 순서 기반 roving tabindex 그룹
 *
 * Tab 키로 그룹에 진입한 뒤 방향키와 Home, End 키로 항목 간 포커스를 이동한다.
 * 방향키는 DOM 순서 기준의 선형 이동으로 ArrowDown, ArrowRight가 다음 항목이고
 * ArrowUp, ArrowLeft가 이전 항목이다.
 * disabled 항목은 건너뛰고 항목 구성이 변경되면 포커스를 첫 번째 항목으로 초기화한다.
 * 선택 상태나 활성 상태는 관리하지 않고, 포커스 이동만 담당한다.
 *
 * @returns 컨테이너에 적용할 `containerProps`, `RovingFocusProvider`에 넘길 `contextValue`
 */
export function useRovingFocusGroup<T extends HTMLElement>(): RovingFocusGroup<T> {
  const containerRef = useRef<T>(null);
  const [tabStopId, setTabStopId] = useState<string | null>(null);

  const isOwnItem = (item: Element) =>
    item.closest("[data-roving-container]") === containerRef.current;

  const getFocusableItems = useCallback(
    () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>("[data-roving-item]:not(:disabled)") ??
          [],
      ).filter(isOwnItem),
    [],
  );

  // 현재 항목 목록은 DOM 조회로 구성하므로 별도의 의존성으로 추적할 수 없다.
  // 의존성 배열을 추가하면 항목 추가 및 제거 시점과 동기화되지 않는다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const ids = getFocusableItems().map(item => item.dataset.rovingId);
    if (tabStopId != null && ids.includes(tabStopId)) {
      return;
    }
    setTabStopId(ids[0] ?? null);
  });

  const handleFocus = useCallback((event: FocusEvent<T>) => {
    if (!isOwnItem(event.target as HTMLElement)) {
      return;
    }

    const id = (event.target as HTMLElement).dataset.rovingId;

    if (id != null) {
      setTabStopId(id);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<T>) => {
      if (!NAVIGATION_KEYS.includes(event.key)) {
        return;
      }

      const items = getFocusableItems();
      const currentIndex = items.indexOf(event.target as HTMLElement);
      if (currentIndex === -1) {
        return;
      }

      const lastIndex = items.length - 1;
      let nextIndex: number;
      switch (event.key) {
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = lastIndex;
          break;
        case "ArrowDown":
        case "ArrowRight":
          nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
          break;
        default:
          nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      }

      event.preventDefault();
      items[nextIndex]?.focus();
    },
    [getFocusableItems],
  );

  const onItemUnmount = useCallback((id: string) => {
    setTabStopId(prev => (prev === id ? null : prev));
  }, []);

  const containerProps = useMemo<RovingFocusContainerProps<T>>(
    () => ({
      ref: containerRef,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      "data-roving-container": "",
    }),
    [handleKeyDown, handleFocus],
  );

  const contextValue = useMemo<RovingFocusContextValue>(
    () => ({ tabStopId, onItemUnmount }),
    [tabStopId, onItemUnmount],
  );

  return { containerProps, contextValue };
}

interface RovingFocusItemProps {
  "data-roving-item": string;
  "data-roving-id": string;
  tabIndex: 0 | -1;
}

/**
 * roving 그룹 내 항목에 넘길 props를 반환한다.
 *
 * `id`가 `undefined`이거나 `RovingFocusProvider` 밖이면 `undefined`를 반환한다.
 * 반환값을 각 항목에 전달하면 `tabIndex`와 조회용 `data-roving-*` 속성이 적용된다.
 */
export function useRovingFocusItem(id: string | undefined): RovingFocusItemProps | undefined {
  const context = useContext(RovingFocusContext);
  const onItemUnmount = context?.onItemUnmount;

  useLayoutEffect(() => {
    if (id == null || onItemUnmount == null) {
      return;
    }
    return () => onItemUnmount(id);
  }, [id, onItemUnmount]);

  if (id == null || context == null) {
    return undefined;
  }

  return {
    "data-roving-item": "",
    "data-roving-id": id,
    tabIndex: context.tabStopId === id ? 0 : -1,
  };
}
