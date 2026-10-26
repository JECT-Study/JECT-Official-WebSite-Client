import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from "react";

import { COLUMN_SCROLLING_ATTRIBUTE } from "./timePicker.constants";

const SELECTED_ITEM_SELECTOR = '[aria-selected="true"]';
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const SCROLL_END_FALLBACK_MS = 1000;

const getScrollBehavior = (isFirstRender: boolean): ScrollBehavior => {
  if (isFirstRender || window.matchMedia(REDUCED_MOTION_QUERY).matches) return "auto";

  return "smooth";
};

/**
 * 열에 스크롤 중 표시를 붙이고, `scrollend`가 오거나 `SCROLL_END_FALLBACK_MS`가 지나면 뗍니다.
 * `scrollend`를 지원하지 않는 브라우저는 타이머로만 뗍니다.
 */
const markScrolling = (list: HTMLElement) => {
  list.setAttribute(COLUMN_SCROLLING_ATTRIBUTE, "");

  const unmark = () => {
    window.clearTimeout(timeoutId);
    list.removeEventListener("scrollend", unmark);
    list.removeAttribute(COLUMN_SCROLLING_ATTRIBUTE);
  };
  const timeoutId = window.setTimeout(unmark, SCROLL_END_FALLBACK_MS);
  list.addEventListener("scrollend", unmark);

  return unmark;
};

/** 선택 항목을 맨 위로 스크롤합니다. 부드럽게 이동할 때만 스크롤 중 표시를 해제하는 함수를 돌려줍니다. */
const scrollSelectedToTop = (list: HTMLElement | null, behavior: ScrollBehavior) => {
  const selected = list?.querySelector<HTMLElement>(SELECTED_ITEM_SELECTOR);
  if (list == null || selected == null) return null;

  const paddingTop = Number.parseFloat(getComputedStyle(list).paddingTop);
  const top = selected.offsetTop - paddingTop;
  const isMoving = behavior === "smooth" && Math.abs(list.scrollTop - top) >= 1;
  const unmark = isMoving ? markScrolling(list) : null;

  list.scrollTo({ top, behavior });

  return unmark;
};

/**
 * @description 선택 항목을 열의 맨 위로 스크롤합니다.
 *
 * @remarks
 * 처음 그릴 때는 바로 맞추고, 이후 `selectedValue`나 `optionCount`가 바뀌면 부드럽게 이동합니다. 동작 줄이기 설정이 켜져 있으면 바로 맞춥니다.
 * 값이 그대로여서 다시 맞추지 않는 경우(이미 선택된 항목을 다시 고를 때)에는 `alignSelected`를 호출합니다.
 * 부드럽게 이동하는 동안 열에 `data-scrolling`을 붙입니다. 열 엘리먼트가 항목의 `offsetParent`여야 합니다.
 * @param listRef 스크롤되는 열 엘리먼트
 * @param selectedValue 열에서 선택된 항목 값. 선택이 없으면 `null`
 * @param optionCount 열의 항목 개수. 간격이나 형식이 바뀌어 항목 위치가 달라지면 다시 맞추는 기준입니다.
 * @returns 선택 항목을 맨 위로 되돌리는 `alignSelected`
 */
export const useColumnScroll = (
  listRef: RefObject<HTMLElement>,
  selectedValue: string | null,
  optionCount: number,
) => {
  const hasRenderedRef = useRef(false);
  const unmarkScrollingRef = useRef<(() => void) | null>(null);

  const scrollToSelected = useCallback(
    (behavior: ScrollBehavior) => {
      unmarkScrollingRef.current?.();
      unmarkScrollingRef.current = scrollSelectedToTop(listRef.current, behavior);
    },
    [listRef],
  );

  useLayoutEffect(() => {
    const isFirstRender = !hasRenderedRef.current;
    hasRenderedRef.current = true;

    if (selectedValue == null) return;

    scrollToSelected(getScrollBehavior(isFirstRender));
  }, [scrollToSelected, selectedValue, optionCount]);

  useEffect(() => {
    return () => {
      unmarkScrollingRef.current?.();
    };
  }, []);

  const alignSelected = useCallback(() => {
    scrollToSelected(getScrollBehavior(false));
  }, [scrollToSelected]);

  return { alignSelected };
};
