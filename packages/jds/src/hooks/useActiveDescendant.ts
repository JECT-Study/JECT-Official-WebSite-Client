import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";

import { VIRTUAL_FOCUS_ATTRIBUTE } from "@/utils/virtualFocus";

type ActiveDescendantDirection = "next" | "prev" | "first" | "last";

interface UseActiveDescendantParams {
  disabled?: boolean;
}

interface ActiveDescendantItemParams {
  value: string;
  disabled?: boolean;
}

interface ActiveDescendantItemProps {
  "data-active-descendant": string;
  "data-disabled": true | undefined;
}

interface ActiveDescendantContainerProps {
  [VIRTUAL_FOCUS_ATTRIBUTE]: string;
}

interface ActiveDescendantGroup<T extends HTMLElement> {
  containerRef: RefObject<T>;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  getEnabledValues: () => string[];
  onKeyDown: (e: KeyboardEvent) => void;
}

const ITEM_SELECTOR = "[data-active-descendant]:not([data-disabled])";

/**
 * 활성 이동 대상이 되는 항목에 적용할 속성을 만든다.
 *
 * `useActiveDescendant`가 이 속성으로 항목을 찾고 값을 읽으므로, 항목은 직접 속성을 쓰지 않고 이 함수를 거친다.
 */
export const getActiveDescendantItemProps = ({
  value,
  disabled,
}: ActiveDescendantItemParams): ActiveDescendantItemProps => ({
  "data-active-descendant": value,
  "data-disabled": disabled || undefined,
});

/**
 * 항목을 담는 컨테이너에 적용할 속성을 만든다.
 *
 * 포커스가 컨테이너 밖에 있으면 `:focus-visible` 이 적용되지 않으므로,
 * 스타일이 활성 항목을 표시할지 이 속성으로 판단한다.
 */
export const getActiveDescendantContainerProps = (): ActiveDescendantContainerProps => ({
  [VIRTUAL_FOCUS_ATTRIBUTE]: "",
});

const DIRECTION_BY_KEY: Record<string, ActiveDescendantDirection> = {
  ArrowDown: "next",
  ArrowUp: "prev",
  Home: "first",
  End: "last",
};

/**
 * DOM 순서 기반 aria-activedescendant 그룹
 *
 * 포커스는 컨테이너나 트리거에 둔 채 방향키와 Home, End 키로 활성 항목을 이동한다.
 * 항목은 `getActiveDescendantItemProps`가 부여한 속성으로 식별하고 disabled 항목은 건너뛰며,
 * 마지막 항목에서 다시 처음으로 순환한다.
 * 선택 상태나 확정 동작은 관리하지 않고, 활성 위치 이동만 담당한다.
 *
 * @returns 컨테이너에 연결할 `containerRef`, 활성 값 `activeValue`와 setter, 키보드 핸들러 `onKeyDown`
 */
export function useActiveDescendant<T extends HTMLElement>({
  disabled = false,
}: UseActiveDescendantParams = {}): ActiveDescendantGroup<T> {
  const containerRef = useRef<T>(null);
  const [activeValue, setActiveValue] = useState<string | null>(null);

  const getItemValues = useCallback(() => {
    const items = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [],
    );
    return { items, values: items.map(item => item.dataset.activeDescendant ?? "") };
  }, []);

  const move = useCallback(
    (direction: ActiveDescendantDirection) => {
      const { items, values } = getItemValues();
      if (items.length === 0) return;

      const currentIndex = activeValue != null ? values.indexOf(activeValue) : -1;
      const lastIndex = items.length - 1;

      let nextIndex: number;
      switch (direction) {
        case "first":
          nextIndex = 0;
          break;
        case "last":
          nextIndex = lastIndex;
          break;
        case "next":
          nextIndex = currentIndex < 0 || currentIndex === lastIndex ? 0 : currentIndex + 1;
          break;
        default:
          nextIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1;
      }

      setActiveValue(values[nextIndex]);
      items[nextIndex].scrollIntoView({ block: "nearest" });
    },
    [activeValue, getItemValues],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return;

      const direction = DIRECTION_BY_KEY[e.key];
      if (direction == null) return;

      e.preventDefault();
      move(direction);
    },
    [disabled, move],
  );

  const getEnabledValues = useCallback(() => getItemValues().values, [getItemValues]);

  // 현재 항목 목록은 DOM 조회로 구성하므로 별도의 의존성으로 추적할 수 없다.
  // 의존성 배열을 추가하면 항목 추가 및 제거 시점과 동기화되지 않는다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (activeValue == null || containerRef.current == null) return;

    if (!getEnabledValues().includes(activeValue)) setActiveValue(null);
  });

  return { containerRef, activeValue, setActiveValue, getEnabledValues, onKeyDown };
}
