import { clsx } from "clsx";
import { forwardRef, useEffect } from "react";

import * as styles from "./pagination.css";
import type {
  PaginationArrowProps,
  PaginationItemProps,
  PaginationProps,
} from "./pagination.types";
import { getPaginationRange, normalizePaginationValues } from "./pagination.utils";

import { Icon } from "@/components/Icon";
import { useControllableState } from "@/hooks/useControllableState";
import { getLabelClassName } from "@/utils/typography";
import { visuallyHidden } from "@/utils/visuallyHidden.css";

const PaginationItem = ({
  itemPage,
  isCurrent,
  disabled,
  getPageHref,
  onPageChange,
}: PaginationItemProps) => {
  const className = clsx(
    styles.page,
    getLabelClassName({ size: "md", weight: isCurrent ? "bold" : "subtle" }),
  );

  if (getPageHref) {
    return (
      <a
        href={disabled ? undefined : getPageHref(itemPage)}
        role={disabled ? "link" : undefined}
        tabIndex={disabled ? -1 : undefined}
        aria-current={isCurrent ? "page" : undefined}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        className={className}
      >
        {itemPage}
      </a>
    );
  }

  return (
    <button
      type='button'
      disabled={disabled}
      aria-current={isCurrent ? "page" : undefined}
      data-disabled={disabled || undefined}
      className={className}
      onClick={() => onPageChange(itemPage)}
    >
      {itemPage}
    </button>
  );
};

const PaginationArrow = ({
  direction,
  page,
  totalPages,
  disabled,
  getPageHref,
  onPageChange,
}: PaginationArrowProps) => {
  const targetPage = direction === "previous" ? page - 1 : page + 1;

  const isDisabled = disabled || (direction === "previous" ? page === 1 : page === totalPages);
  const label = direction === "previous" ? "이전 페이지" : "다음 페이지";
  const icon = direction === "previous" ? "chevron-left" : "chevron-right";
  const iconElement = <Icon name={icon} size='xs' aria-hidden />;

  if (getPageHref) {
    return (
      <a
        href={isDisabled ? undefined : getPageHref(targetPage)}
        role={isDisabled ? "link" : undefined}
        tabIndex={isDisabled ? -1 : undefined}
        aria-label={label}
        aria-disabled={isDisabled || undefined}
        data-disabled={isDisabled || undefined}
        className={styles.arrow}
      >
        {iconElement}
      </a>
    );
  }

  return (
    <button
      type='button'
      disabled={isDisabled}
      aria-label={label}
      data-disabled={isDisabled || undefined}
      className={styles.arrow}
      onClick={() => onPageChange(targetPage)}
    >
      {iconElement}
    </button>
  );
};

const PaginationEllipsis = () => (
  <span className={clsx(styles.ellipsis, getLabelClassName({ size: "md", weight: "subtle" }))}>
    <span aria-hidden>…</span>
    <span className={visuallyHidden}>생략됨</span>
  </span>
);

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      defaultPage = 1,
      totalPages,
      visiblePageCount = 7,
      disabled: isDisabled = false,
      getPageHref,
      onPageChange,
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...restProps
    },
    ref,
  ) => {
    const [resolvedPage, setPage] = useControllableState(page, defaultPage, onPageChange);
    const { page: normalizedPage, totalPages: normalizedTotalPages } = normalizePaginationValues({
      page: resolvedPage,
      totalPages,
    });

    // totalPages 변경 시 비제어 내부 페이지를 유효 범위로 동기화한다.
    useEffect(() => {
      if (page === undefined && resolvedPage !== normalizedPage) {
        setPage(normalizedPage);
      }
    }, [normalizedPage, page, resolvedPage, setPage]);

    if (normalizedTotalPages < 1) return null;

    const paginationRange = getPaginationRange({
      page: normalizedPage,
      totalPages: normalizedTotalPages,
      visiblePageCount,
    });

    const navigationProps = getPageHref ? { getPageHref } : { onPageChange: setPage };

    return (
      <nav
        {...restProps}
        ref={ref}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={className}
      >
        <ul className={styles.list}>
          <li className={styles.item}>
            <PaginationArrow
              {...navigationProps}
              direction='previous'
              page={normalizedPage}
              totalPages={normalizedTotalPages}
              disabled={isDisabled}
            />
          </li>

          {paginationRange.map(item => (
            <li className={styles.item} key={item}>
              {typeof item === "number" ? (
                <PaginationItem
                  {...navigationProps}
                  itemPage={item}
                  isCurrent={item === normalizedPage}
                  disabled={isDisabled}
                />
              ) : (
                <PaginationEllipsis />
              )}
            </li>
          ))}

          <li className={styles.item}>
            <PaginationArrow
              {...navigationProps}
              direction='next'
              page={normalizedPage}
              totalPages={normalizedTotalPages}
              disabled={isDisabled}
            />
          </li>
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
