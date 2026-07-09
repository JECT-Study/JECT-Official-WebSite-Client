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

export type LocalNavigationProps = Omit<ComponentPropsWithoutRef<"nav">, "title" | "children"> & {
  title: string;
  titleAs?: LocalNavigationTitleAs;
  nested?: boolean;
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  suffixAction?: ReactNode;
} & ({ floated?: false; stretched?: boolean } | { floated: true; stretched?: false });
