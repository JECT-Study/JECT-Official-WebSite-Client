import type { ComponentPropsWithoutRef, ElementType } from "react";
import type { AriaLabelProps } from "types";

export type PaginationVisiblePageCount = 7 | 8 | 9 | 10 | 11;

interface PaginationLinkComponentProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
}

type PaginationLinkComponent = ElementType<PaginationLinkComponentProps, "a">;

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
  linkAs?: never;
}

interface PaginationButtonUncontrolledProps {
  page?: never;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  getPageHref?: never;
  linkAs?: never;
}

interface PaginationLinkModeProps {
  page: number;
  defaultPage?: never;
  getPageHref: (page: number) => string;
  linkAs?: PaginationLinkComponent;
  onPageChange?: never;
}

export type PaginationButtonProps = PaginationBaseProps &
  AriaLabelProps &
  (PaginationButtonControlledProps | PaginationButtonUncontrolledProps);

export type PaginationLinkProps = PaginationBaseProps & AriaLabelProps & PaginationLinkModeProps;

export type PaginationProps = PaginationButtonProps | PaginationLinkProps;

interface PaginationButtonNavigationProps {
  getPageHref?: never;
  linkAs?: never;
  onPageChange: (page: number) => void;
}

interface PaginationLinkNavigationProps {
  getPageHref: (page: number) => string;
  linkAs?: PaginationLinkComponent;
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
