import type { ComponentPropsWithoutRef } from "react";

export type LinkProps = ComponentPropsWithoutRef<"a"> & {
  external?: boolean;
  asChild?: boolean;
  disabled?: boolean;
};
