import { useCallback, useLayoutEffect, useRef, type RefObject } from "react";

const SELECTED_ITEM_SELECTOR = '[aria-selected="true"]';

/**
 * @description 선택 항목을 열의 맨 위로 스크롤합니다.
 *
 * @remarks
 * 처음 그릴 때와 `selectedValue`가 열 밖에서 바뀔 때만 맞춥니다. 열 안에서 고르기 직전에 `skipAlignFor`를 호출하면 그 값으로 바뀔 때는 스크롤하지 않습니다.
 * 열 엘리먼트가 항목의 `offsetParent`여야 합니다.
 * @param listRef 스크롤되는 열 엘리먼트
 * @param selectedValue 열에서 선택된 항목 값. 선택이 없으면 `null`
 * @returns 열 안에서 고를 때 호출할 `skipAlignFor`
 */
export const useColumnScroll = (listRef: RefObject<HTMLElement>, selectedValue: string | null) => {
  const skippedValueRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const skippedValue = skippedValueRef.current;
    skippedValueRef.current = null;

    const list = listRef.current;
    if (list == null || selectedValue == null || skippedValue === selectedValue) return;

    const selected = list.querySelector<HTMLElement>(SELECTED_ITEM_SELECTOR);
    if (selected == null) return;

    const paddingTop = Number.parseFloat(getComputedStyle(list).paddingTop);
    list.scrollTop = selected.offsetTop - paddingTop;
  }, [listRef, selectedValue]);

  const skipAlignFor = useCallback((value: string) => {
    skippedValueRef.current = value;
  }, []);

  return { skipAlignFor };
};
