import type { ComponentPropsWithoutRef } from "react";

export type DividerThickness = "normal" | "bold" | "bolder" | "boldest";
export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed";

interface BaseDividerProps extends Omit<ComponentPropsWithoutRef<"hr">, "children" | "color"> {
  thickness?: DividerThickness;
  decorative?: boolean;
  orientation?: DividerOrientation;
}

interface SolidDividerProps {
  variant?: Exclude<DividerVariant, "dashed">;
  dashLength?: never;
  dashGap?: never;
}

interface DashedDividerProps {
  variant: "dashed";
  dashLength?: number;
  dashGap?: number;
}

export type DividerProps = BaseDividerProps & (SolidDividerProps | DashedDividerProps);
