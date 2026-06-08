import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type KbdSize = "lg" | "md" | "sm" | "xs";
export type KbdType = "key" | "text" | "function";

export interface KbdProps extends ComponentPropsWithoutRef<"kbd"> {
  children: ReactNode;
  size?: KbdSize;
  type?: KbdType;
  muted?: boolean;
}
