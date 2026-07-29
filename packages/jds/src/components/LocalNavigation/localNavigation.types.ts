import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";

export const LOCAL_NAVIGATION_TITLE_AS_OPTIONS = [
  "span",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
] as const;

export type LocalNavigationTitleAs = (typeof LOCAL_NAVIGATION_TITLE_AS_OPTIONS)[number];

type LocalNavigationBaseProps = Omit<
  ComponentPropsWithoutRef<"nav">,
  "title" | "children" | "aria-labelledby"
> & {
  title: string;
  titleAs?: LocalNavigationTitleAs;
  suffixAction?: ReactNode;
};

type NestedProps =
  | { nested?: false; onBackClick?: never }
  | { nested: true; onBackClick: MouseEventHandler<HTMLButtonElement> };

type FloatedProps =
  | { floated?: false; stretched?: boolean }
  | { floated: true; stretched?: false };

export type LocalNavigationProps = LocalNavigationBaseProps & NestedProps & FloatedProps;
