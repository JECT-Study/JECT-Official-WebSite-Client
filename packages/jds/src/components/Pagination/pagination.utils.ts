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

interface PaginationRangeOptions extends PaginationValues {
  // 화살표를 제외하고, 양끝 페이지와 말줄임까지 포함한 최대 항목 수.
  visiblePageCount: PaginationVisiblePageCount;
  // 이미 결정한 숫자 구간.
  window?: PaginationWindow;
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
  const isOdd = visiblePageCount % 2 !== 0;

  // 이전 구간의 안쪽 숫자를 선택하면 표시 범위를 유지한다.
  if (previousWindow && page > previousWindow.start && page < previousWindow.end) {
    return previousWindow;
  }

  // 홀수의 첫 배치는 기존처럼 양끝 근처의 페이지를 연속으로 펼친다.
  if (!previousWindow && isOdd) {
    if (page < edgeRangePageCount) return { start: 1, end: edgeRangePageCount };
    if (page > totalPages - edgeRangePageCount + 1) {
      return { start: totalPages - edgeRangePageCount + 1, end: totalPages };
    }
  }

  // 가운데 구간 후보는 이전 구간의 양끝이나 밖으로 이동할 때 선택 페이지를 해당 끝에서 두 번째에 둔다.
  // 첫 배치는 홀수일 때 중앙, 짝수일 때 오른쪽에 숫자를 하나 더 둔다.
  const middleStart = previousWindow
    ? page <= previousWindow.start
      ? page - 1
      : page - middlePageCount + 2
    : page - Math.floor((middlePageCount - 1) / 2);
  const middleEnd = middleStart + middlePageCount - 1;

  // 기존 홀수 배치는 숫자 하나만 숨기는 말줄임을 만들지 않는다.
  const minMiddleStart = isOdd ? 4 : 3;
  const maxMiddleEnd = totalPages - (isOdd ? 3 : 2);

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
  page,
  totalPages,
  visiblePageCount,
  window,
}: PaginationRangeOptions): PaginationRangeItem[] => {
  if (totalPages <= visiblePageCount) return createPageRange(1, totalPages);

  const visibleWindow = window ?? getPaginationWindow({ page, totalPages, visiblePageCount });
  return getWindowPaginationRange(visibleWindow, totalPages);
};
