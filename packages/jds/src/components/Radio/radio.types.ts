import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type RadioSize = "lg" | "md" | "sm" | "xs";

export interface RadioProps extends ComponentPropsWithoutRef<"input"> {
  radioSize?: RadioSize;
}

export interface RadioStyledProps {
  radioSize: RadioSize;
}

export interface RadioRootProps extends RadioProps {
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

export interface RadioLabelProps {
  children: ReactNode;
}

export interface RadioSubLabelProps {
  children: ReactNode;
}

export interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  children: ReactNode;
}
