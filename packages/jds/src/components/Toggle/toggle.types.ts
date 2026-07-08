import type { ComponentPropsWithoutRef } from "react";

export type ToggleProps = Omit<ComponentPropsWithoutRef<"input">, "children" | "role" | "type"> & {
  children?: never;
};
