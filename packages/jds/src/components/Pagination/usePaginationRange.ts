import { useState } from "react";

import type { PaginationVisiblePageCount } from "./pagination.types";
import { getPaginationRange, getPaginationWindow, type PaginationWindow } from "./pagination.utils";

interface PaginationRangeValues {
  page: number;
  totalPages: number;
  visiblePageCount: PaginationVisiblePageCount;
}

interface PaginationWindowState {
  page: number | undefined;
  totalPages: number;
  visiblePageCount: PaginationVisiblePageCount;
  window: PaginationWindow | undefined;
  isWindowShifted: boolean;
}

const getNextPaginationWindowState = (
  { page, totalPages, visiblePageCount }: PaginationRangeValues,
  previousState?: PaginationWindowState,
): PaginationWindowState => {
  // 페이지가 사라졌다가 다시 생기면 이전 숫자 구간을 이어 쓰지 않는다.
  if (totalPages < 1) {
    if (previousState?.totalPages === 0 && previousState.visiblePageCount === visiblePageCount) {
      return previousState;
    }

    return {
      page: undefined,
      totalPages: 0,
      visiblePageCount,
      window: undefined,
      isWindowShifted: false,
    };
  }

  const hasLayoutChanged =
    !previousState ||
    previousState.totalPages !== totalPages ||
    previousState.visiblePageCount !== visiblePageCount;

  if (previousState && !hasLayoutChanged && previousState.page === page) {
    return previousState;
  }

  const nextWindow =
    totalPages > visiblePageCount
      ? getPaginationWindow({
          page,
          totalPages,
          visiblePageCount,
          // 레이아웃 변경 시 이전 숫자 구간을 재사용하지 않는다.
          previousWindow: hasLayoutChanged ? undefined : previousState?.window,
        })
      : { start: 1, end: totalPages };

  const previousWindow = previousState?.window;

  return {
    page,
    totalPages,
    visiblePageCount,
    window: nextWindow,
    isWindowShifted: previousWindow !== undefined && previousWindow.start !== nextWindow.start,
  };
};

/**
 * 이전 숫자 구간을 기억하고 현재 렌더에 표시할 페이지 목록을 반환한다.
 * `isWindowShifted`는 렌더 중 상태 갱신으로 인한 재렌더에서도 유지되도록 상태에 저장한다.
 */
export const usePaginationRange = (values: PaginationRangeValues) => {
  const [windowState, setWindowState] = useState(() => getNextPaginationWindowState(values));
  const nextWindowState = getNextPaginationWindowState(values, windowState);

  // 계산한 구간을 현재 렌더에서 사용하고, 변경된 경우에만 다음 렌더용 상태를 저장한다.
  if (nextWindowState !== windowState) setWindowState(nextWindowState);

  const { window: visibleWindow, totalPages, isWindowShifted } = nextWindowState;
  const range = visibleWindow ? getPaginationRange({ totalPages, window: visibleWindow }) : [];

  return { range, isWindowShifted };
};
