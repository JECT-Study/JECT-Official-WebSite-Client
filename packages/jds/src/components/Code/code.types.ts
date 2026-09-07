import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type CodeSize = "lg" | "md" | "sm" | "xs";

export interface CodeProps extends ComponentPropsWithoutRef<"code"> {
  children: ReactNode;
  size?: CodeSize;
}
