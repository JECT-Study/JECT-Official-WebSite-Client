import type { PaginationVisiblePageCount } from "./pagination.types";

type PaginationRangeItem = number | "start-ellipsis" | "end-ellipsis";

interface PaginationValues {
  page: number;
  totalPages: number;
}

interface PaginationRangeOptions extends PaginationValues {
  visiblePageCount: PaginationVisiblePageCount;
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

export const getPaginationRange = ({
  page,
  totalPages,
  visiblePageCount,
}: PaginationRangeOptions): PaginationRangeItem[] => {
  if (totalPages <= visiblePageCount) return createPageRange(1, totalPages);

  const edgeRangePageCount = visiblePageCount - 2;

  if (page < edgeRangePageCount) {
    return [...createPageRange(1, edgeRangePageCount), "end-ellipsis", totalPages];
  }

  if (page > totalPages - edgeRangePageCount + 1) {
    return [
      1,
      "start-ellipsis",
      ...createPageRange(totalPages - edgeRangePageCount + 1, totalPages),
    ];
  }

  const siblingCount = (visiblePageCount - 5) / 2;

  return [
    1,
    "start-ellipsis",
    ...createPageRange(page - siblingCount, page + siblingCount),
    "end-ellipsis",
    totalPages,
  ];
};
