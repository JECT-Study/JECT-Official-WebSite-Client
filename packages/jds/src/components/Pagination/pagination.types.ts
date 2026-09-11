import type { ComponentPropsWithoutRef } from "react";
import type { AriaLabelProps } from "types";

export type PaginationVisiblePageCount = 7 | 9 | 11;

export interface PaginationBaseProps extends Omit<
  ComponentPropsWithoutRef<"nav">,
  "aria-label" | "aria-labelledby" | "children"
> {
  totalPages: number;
  visiblePageCount?: PaginationVisiblePageCount;
  disabled?: boolean;
}

interface PaginationButtonControlledProps {
  page: number;
  defaultPage?: never;
  onPageChange: (page: number) => void;
  getPageHref?: never;
}

interface PaginationButtonUncontrolledProps {
  page?: never;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  getPageHref?: never;
}

interface PaginationLinkModeProps {
  page: number;
  defaultPage?: never;
  getPageHref: (page: number) => string;
  onPageChange?: never;
}

export type PaginationButtonProps = PaginationBaseProps &
  AriaLabelProps &
  (PaginationButtonControlledProps | PaginationButtonUncontrolledProps);

export type PaginationLinkProps = PaginationBaseProps & AriaLabelProps & PaginationLinkModeProps;

export type PaginationProps = PaginationButtonProps | PaginationLinkProps;

interface PaginationButtonNavigationProps {
  getPageHref?: never;
  onPageChange: (page: number) => void;
}

interface PaginationLinkNavigationProps {
  getPageHref: (page: number) => string;
  onPageChange?: never;
}

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
