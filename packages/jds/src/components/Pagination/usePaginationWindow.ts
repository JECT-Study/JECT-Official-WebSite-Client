import { useState } from "react";

import type { PaginationVisiblePageCount } from "./pagination.types";
import { getPaginationWindow, type PaginationWindow } from "./pagination.utils";

interface PaginationWindowValues {
  page: number;
  totalPages: number;
  visiblePageCount: PaginationVisiblePageCount;
}

interface PaginationWindowState {
  page: number | undefined;
  totalPages: number;
  visiblePageCount: PaginationVisiblePageCount;
  window: PaginationWindow | undefined;
}

const getNextPaginationWindowState = (
  { page, totalPages, visiblePageCount }: PaginationWindowValues,
  previousState?: PaginationWindowState,
): PaginationWindowState => {
  // 페이지가 사라졌다가 다시 생기면 이전 숫자 구간을 이어 쓰지 않는다.
  if (totalPages < 1) {
    if (previousState?.totalPages === 0 && previousState.visiblePageCount === visiblePageCount) {
      return previousState;
    }

    return { page: undefined, totalPages: 0, visiblePageCount, window: undefined };
  }

  const hasLayoutChanged =
    !previousState ||
    previousState.totalPages !== totalPages ||
    previousState.visiblePageCount !== visiblePageCount;

  if (previousState && !hasLayoutChanged && previousState.page === page) {
    return previousState;
  }

  const hasWindow = totalPages > visiblePageCount;

  return {
    page,
    totalPages,
    visiblePageCount,
    window: hasWindow
      ? getPaginationWindow({
          page,
          totalPages,
          visiblePageCount,
          // 레이아웃 변경 시 이전 숫자 구간을 재사용하지 않는다.
          previousWindow: hasLayoutChanged ? undefined : previousState?.window,
        })
      : undefined,
  };
};

/** 이전 숫자 구간을 기억하고, 페이지 또는 레이아웃이 바뀌면 다음 구간을 계산한다. */
export const usePaginationWindow = (
  values: PaginationWindowValues,
): PaginationWindow | undefined => {
  const [windowState, setWindowState] = useState(() => getNextPaginationWindowState(values));
  const nextWindowState = getNextPaginationWindowState(values, windowState);

  // 계산한 구간을 현재 렌더에서 사용하고, 변경된 경우에만 다음 렌더용 상태를 저장한다.
  if (nextWindowState !== windowState) setWindowState(nextWindowState);

  return nextWindowState.window;
};
