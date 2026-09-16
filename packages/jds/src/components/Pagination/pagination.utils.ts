import type { PaginationVisiblePageCount } from "./pagination.types";

type PaginationRangeItem = number | "start-ellipsis" | "end-ellipsis";

interface PaginationValues {
  page: number;
  totalPages: number;
}

export interface PaginationWindow {
  start: number;
  end: number;
}

interface PaginationRangeOptions {
  totalPages: number;
  window: PaginationWindow;
}

interface PaginationWindowOptions extends PaginationValues {
  visiblePageCount: PaginationVisiblePageCount;
  // 이동 전 숫자 구간. 첫 배치나 레이아웃 변경 시에는 없다.
  previousWindow?: PaginationWindow;
}

export const normalizePaginationValues = ({
  page,
  totalPages,
}: PaginationValues): PaginationValues => {
  const normalizedTotalPages = Number.isFinite(totalPages)
    ? Math.max(Math.trunc(totalPages), 0)
    : 0;

  const normalizedPage =
    normalizedTotalPages > 0 && Number.isFinite(page)
      ? Math.min(Math.max(Math.trunc(page), 1), normalizedTotalPages)
      : 1;

  return {
    page: normalizedPage,
    totalPages: normalizedTotalPages,
  };
};

const createPageRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

export const getPaginationWindow = ({
  page,
  totalPages,
  visiblePageCount,
  previousWindow,
}: PaginationWindowOptions): PaginationWindow => {
  const edgeRangePageCount = visiblePageCount - 2;
  const middlePageCount = visiblePageCount - 4;

  // 이전 구간의 안쪽 숫자를 선택하면 표시 범위를 유지한다.
  if (previousWindow && page > previousWindow.start && page < previousWindow.end) {
    return previousWindow;
  }

  // 가운데 구간 후보는 이전 구간의 양끝이나 밖으로 이동할 때 선택 페이지를 해당 끝에서 두 번째에 둔다.
  // 첫 배치는 홀수일 때 중앙, 짝수일 때 오른쪽에 숫자를 하나 더 둔다.
  const middleStart = previousWindow
    ? page <= previousWindow.start
      ? page - 1
      : page - middlePageCount + 2
    : page - Math.floor((middlePageCount - 1) / 2);
  const middleEnd = middleStart + middlePageCount - 1;

  // 말줄임은 최소 두 페이지를 숨길 수 있을 때만 표시한다.
  const minMiddleStart = 4;
  const maxMiddleEnd = totalPages - 3;

  if (middleStart < minMiddleStart) {
    return { start: 1, end: edgeRangePageCount };
  }

  if (middleEnd > maxMiddleEnd) {
    return { start: totalPages - edgeRangePageCount + 1, end: totalPages };
  }

  return { start: middleStart, end: middleEnd };
};

const getWindowPaginationRange = (
  { start, end }: PaginationWindow,
  totalPages: number,
): PaginationRangeItem[] => {
  if (start === 1) {
    return [...createPageRange(start, end), "end-ellipsis", totalPages];
  }

  if (end === totalPages) {
    return [1, "start-ellipsis", ...createPageRange(start, end)];
  }

  return [1, "start-ellipsis", ...createPageRange(start, end), "end-ellipsis", totalPages];
};

export const getPaginationRange = ({
  totalPages,
  window,
}: PaginationRangeOptions): PaginationRangeItem[] => {
  if (window.start === 1 && window.end === totalPages) {
    return createPageRange(1, totalPages);
  }

  return getWindowPaginationRange(window, totalPages);
};
