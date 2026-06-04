import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type StepSize = "lg" | "md";
export type StepLayout = "horizontal" | "vertical";

export interface StepRootProps extends ComponentPropsWithoutRef<"div"> {
  size?: StepSize;
  layout?: StepLayout;
  current?: number;
  children: ReactNode;
}

export interface StepItemProps extends ComponentPropsWithoutRef<"div"> {
  index: number;
  activated?: boolean;
  children: ReactNode;
}
