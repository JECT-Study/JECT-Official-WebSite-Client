import type { ReactNode } from "react";

import type { RadioProps } from "../radioBasic/radio.types";

export type RadioSize = "lg" | "md" | "sm" | "xs";

export interface RadioContentProps extends RadioProps {
  radioStyle?: "empty" | "outline";
  align?: "left" | "right";
  disabled?: boolean;
  subLabelVisible?: boolean;
  subLabel?: ReactNode;
  children: ReactNode;
}

export interface StyledLabelProps {
  $size: RadioSize;
  $isDisabled: boolean;
}
