import type { HTMLAttributes, ReactNode } from "react";

export type CodeSize = "lg" | "md" | "sm" | "xs";

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  size?: CodeSize;
}
