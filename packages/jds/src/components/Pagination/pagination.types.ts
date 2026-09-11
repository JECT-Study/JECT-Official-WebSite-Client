import type { ComponentPropsWithoutRef } from "react";
import type { AriaLabelProps } from "types";

export type PaginationVisiblePageCount = 7 | 9 | 11;

export interface PaginationBaseProps extends Omit<
  ComponentPropsWithoutRef<"nav">,
  "aria-label" | "aria-labelledby" | "children"
> {
  page: number;
  totalPages: number;
  visiblePageCount?: PaginationVisiblePageCount;
  disabled?: boolean;
}

interface PaginationButtonNavigationProps {
  getPageHref?: never;
  onPageChange: (page: number) => void;
}

interface PaginationLinkNavigationProps {
  getPageHref: (page: number) => string;
  onPageChange?: never;
}

export type PaginationButtonProps = PaginationBaseProps &
  AriaLabelProps &
  PaginationButtonNavigationProps;

export type PaginationLinkProps = PaginationBaseProps &
  AriaLabelProps &
  PaginationLinkNavigationProps;

export type PaginationProps = PaginationButtonProps | PaginationLinkProps;

type PaginationNavigationProps = PaginationButtonNavigationProps | PaginationLinkNavigationProps;

interface PaginationItemBaseProps {
  itemPage: number;
  isCurrent: boolean;
  disabled: boolean;
}

export type PaginationItemProps = PaginationItemBaseProps & PaginationNavigationProps;

interface PaginationArrowBaseProps {
  direction: "previous" | "next";
  page: number;
  totalPages: number;
  disabled: boolean;
}

export type PaginationArrowProps = PaginationArrowBaseProps & PaginationNavigationProps;
