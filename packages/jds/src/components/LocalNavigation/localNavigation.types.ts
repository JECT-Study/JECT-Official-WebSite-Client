import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";

export type LocalNavigationProps = Omit<ComponentPropsWithoutRef<"nav">, "title" | "children"> & {
  title: string;
  nested?: boolean;
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  suffixAction?: ReactNode;
} & ({ floated?: false; stretched?: boolean } | { floated: true; stretched?: false });
