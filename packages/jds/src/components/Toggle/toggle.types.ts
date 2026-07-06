import type { ComponentPropsWithoutRef } from "react";

export type ToggleProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "role" | "aria-checked" | "children"
> & {
  checked: boolean;
  children?: never;
};
