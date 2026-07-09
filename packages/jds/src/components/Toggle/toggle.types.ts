import type { ComponentPropsWithoutRef } from "react";

export type ToggleProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "children" | "readOnly" | "role" | "type"
> & {
  children?: never;
};
