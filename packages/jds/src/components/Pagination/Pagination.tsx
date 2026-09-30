import { clsx } from "clsx";
import { forwardRef, type ElementType } from "react";

import * as styles from "./pagination.css";
import type { PaginationLinkProps, PaginationProps } from "./pagination.types";
import { normalizePaginationValues } from "./pagination.utils";
import { usePaginationRange } from "./usePaginationRange";

import { Icon } from "@/components/Icon";
import { useControllableState } from "@/hooks/useControllableState";
import { getLabelClassName } from "@/utils/typography";
import { visuallyHidden } from "@/utils/visuallyHidden.css";

interface PaginationButtonNavigationProps {
  getPageHref?: never;
  linkAs?: never;
  onPageChange: (page: number) => void;
}

interface PaginationLinkNavigationProps {
  getPageHref: PaginationLinkProps["getPageHref"];
  linkAs?: PaginationLinkProps["linkAs"];
  onPageChange?: never;
}

type PaginationNavigationProps = PaginationButtonNavigationProps | PaginationLinkNavigationProps;

interface PaginationItemBaseProps {
  itemPage: number;
  isCurrent: boolean;
  disabled: boolean;
}

type PaginationItemProps = PaginationItemBaseProps & PaginationNavigationProps;

interface PaginationArrowBaseProps {
  direction: "previous" | "next";
  page: number;
  totalPages: number;
  disabled: boolean;
}

type PaginationArrowProps = PaginationArrowBaseProps & PaginationNavigationProps;

const PaginationItem = ({
  itemPage,
  isCurrent,
  disabled,
  getPageHref,
  linkAs,
  onPageChange,
}: PaginationItemProps) => {
  const className = clsx(
    styles.page,
    getLabelClassName({ size: "md", weight: isCurrent ? "bold" : "subtle" }),
  );

  if (getPageHref) {
    const LinkComponent: ElementType = disabled ? "a" : (linkAs ?? "a");

    return (
      <LinkComponent
        href={disabled ? undefined : getPageHref(itemPage)}
        role={disabled ? "link" : undefined}
        tabIndex={disabled ? -1 : undefined}
        aria-current={isCurrent ? "page" : undefined}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        className={className}
      >
        {itemPage}
      </LinkComponent>
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
  linkAs,
  onPageChange,
}: PaginationArrowProps) => {
  const isPrevious = direction === "previous";

  const targetPage = isPrevious ? page - 1 : page + 1;
  const isDisabled = disabled || (isPrevious ? page === 1 : page === totalPages);

  const label = isPrevious ? "이전 페이지" : "다음 페이지";
  const icon = isPrevious ? "chevron-left" : "chevron-right";
  const iconElement = <Icon name={icon} size='xs' aria-hidden />;

  if (getPageHref) {
    const LinkComponent: ElementType = isDisabled ? "a" : (linkAs ?? "a");

    return (
      <LinkComponent
        href={isDisabled ? undefined : getPageHref(targetPage)}
        role={isDisabled ? "link" : undefined}
        tabIndex={isDisabled ? -1 : undefined}
        aria-label={label}
        aria-disabled={isDisabled || undefined}
        data-disabled={isDisabled || undefined}
        className={styles.arrow}
      >
        {iconElement}
      </LinkComponent>
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
      linkAs,
      onPageChange,
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...restProps
    },
    ref,
  ) => {
    const [resolvedPage, setPage] = useControllableState(page, defaultPage, onPageChange);
    const navigationProps = getPageHref ? { getPageHref, linkAs } : { onPageChange: setPage };

    const { page: normalizedPage, totalPages: normalizedTotalPages } = normalizePaginationValues({
      page: resolvedPage,
      totalPages,
    });

    const paginationRange = usePaginationRange({
      page: normalizedPage,
      totalPages: normalizedTotalPages,
      visiblePageCount,
    });

    if (normalizedTotalPages < 1) return null;

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
