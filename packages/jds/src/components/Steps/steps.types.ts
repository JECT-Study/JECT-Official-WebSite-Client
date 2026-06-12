import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type StepsSize = "lg" | "md";
export type StepsLayout = "horizontal" | "vertical";

export interface StepsRootProps extends ComponentPropsWithoutRef<"ol"> {
  size?: StepsSize;
  layout?: StepsLayout;
  current?: number;
  children: ReactNode;
}

export interface StepsItemProps extends ComponentPropsWithoutRef<"div"> {
  index: number;
  activated?: boolean;
  children: ReactNode;
}
