import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type RadioSize = "lg" | "md" | "sm" | "xs";

export type RadioBasicProps = ComponentPropsWithoutRef<"input">;

export interface RadioStyledProps {
  radioSize: RadioSize;
}

export interface RadioRootProps extends ComponentPropsWithoutRef<"div"> {
  radioStyle?: "empty" | "outline";
  align?: "left" | "right";
  disabled?: boolean;
  children: ReactNode;
  radioSize?: RadioSize;
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
