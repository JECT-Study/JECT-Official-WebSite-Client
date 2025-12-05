import type { ComponentPropsWithoutRef } from "react";

export type RadioSize = "lg" | "md" | "sm" | "xs";

export interface RadioProps extends ComponentPropsWithoutRef<"input"> {
  radioSize?: RadioSize;
}

export interface RadioStyledProps {
  radioSize: RadioSize;
}
