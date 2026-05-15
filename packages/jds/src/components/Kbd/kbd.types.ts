import type { HTMLAttributes, ReactNode } from "react";

export type KbdSize = "lg" | "md" | "sm" | "xs";
export type KbdType = "key" | "text" | "function";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  size?: KbdSize;
  type?: KbdType;
  muted?: boolean;
  "aria-label"?: string;
}
