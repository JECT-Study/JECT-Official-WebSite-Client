import { useLayoutEffect, useRef, type RefObject } from "react";

const SELECTED_ITEM_SELECTOR = '[aria-selected="true"]';
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const getScrollBehavior = (isFirstRender: boolean): ScrollBehavior => {
  if (isFirstRender || window.matchMedia(REDUCED_MOTION_QUERY).matches) return "instant";

  return "smooth";
};

/**
 * @description 선택 항목을 열의 맨 위로 스크롤합니다.
 *
 * @remarks
 * 처음 그릴 때는 바로 맞추고, 이후 `selectedValue`나 `optionCount`가 바뀌면 부드럽게 이동합니다. 동작 줄이기 설정이 켜져 있으면 바로 맞춥니다.
 * 열 엘리먼트가 항목의 `offsetParent`여야 합니다.
 * @param listRef 스크롤되는 열 엘리먼트
 * @param selectedValue 열에서 선택된 항목 값. 선택이 없으면 `null`
 * @param optionCount 열의 항목 개수. 간격이나 형식이 바뀌어 항목 위치가 달라지면 다시 맞추는 기준입니다.
 */
export const useColumnScroll = (
  listRef: RefObject<HTMLElement>,
  selectedValue: string | null,
  optionCount: number,
) => {
  const hasRenderedRef = useRef(false);

  useLayoutEffect(() => {
    const isFirstRender = !hasRenderedRef.current;
    hasRenderedRef.current = true;

    const list = listRef.current;
    if (list == null || selectedValue == null) return;

    const selected = list.querySelector<HTMLElement>(SELECTED_ITEM_SELECTOR);
    if (selected == null) return;

    const paddingTop = Number.parseFloat(getComputedStyle(list).paddingTop);
    list.scrollTo({
      top: selected.offsetTop - paddingTop,
      behavior: getScrollBehavior(isFirstRender),
    });
  }, [listRef, selectedValue, optionCount]);
};
