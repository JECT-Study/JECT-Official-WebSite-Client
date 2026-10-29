import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type KbdSize = "lg" | "md" | "sm";

export interface KbdProps extends ComponentPropsWithoutRef<"kbd"> {
  children: ReactNode;
  size?: KbdSize;
  isMuted?: boolean;
}
