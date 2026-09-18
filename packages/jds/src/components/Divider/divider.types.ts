import type { ComponentPropsWithoutRef } from "react";

export type DividerThickness = "normal" | "bold" | "bolder" | "boldest";
export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed";

export interface BaseDividerProps extends Omit<
  ComponentPropsWithoutRef<"hr">,
  "children" | "color"
> {
  thickness?: DividerThickness;
  decorative?: boolean;
  orientation?: DividerOrientation;
}

export type DividerProps = BaseDividerProps &
  (
    | { variant?: Exclude<DividerVariant, "dashed">; dashLength?: never; dashGap?: never }
    | { variant: "dashed"; dashLength?: number; dashGap?: number }
  );
