import type { PaginationVisiblePageCount } from "./pagination.types";

type PaginationRangeItem = number | "start-ellipsis" | "end-ellipsis";

interface GetPaginationRangeParams {
  page: number;
  totalPages: number;
  visiblePageCount: PaginationVisiblePageCount;
}

interface NormalizePaginationValuesParams {
  page: number;
  totalPages: number;
}

export const normalizePaginationValues = ({
  page,
  totalPages,
}: NormalizePaginationValuesParams) => {
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

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

export const getPaginationRange = ({
  page,
  totalPages,
  visiblePageCount,
}: GetPaginationRangeParams): PaginationRangeItem[] => {
  if (totalPages <= visiblePageCount) return range(1, totalPages);

  const edgePageCount = visiblePageCount - 2;

  if (page < edgePageCount) {
    return [...range(1, edgePageCount), "end-ellipsis", totalPages];
  }

  if (page > totalPages - edgePageCount + 1) {
    return [1, "start-ellipsis", ...range(totalPages - edgePageCount + 1, totalPages)];
  }

  const siblingCount = (visiblePageCount - 5) / 2;

  return [
    1,
    "start-ellipsis",
    ...range(page - siblingCount, page + siblingCount),
    "end-ellipsis",
    totalPages,
  ];
};
