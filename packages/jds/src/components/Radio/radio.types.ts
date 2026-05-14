import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type RadioSize = "lg" | "md" | "sm" | "xs";
export type RadioStyle = "empty" | "outline";
export type RadioAlign = "left" | "right";

export interface RadioRootProps {
  radioSize?: RadioSize;
  radioStyle?: RadioStyle;
  radioAlign?: RadioAlign;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  children: ReactNode;
}

export interface RadioBasicProps extends ComponentPropsWithoutRef<"input"> {
  radioSize?: RadioSize;
}

export interface RadioItemProps extends ComponentPropsWithoutRef<"div"> {
  radioSize?: RadioSize;
  radioStyle?: RadioStyle;
  radioAlign?: RadioAlign;
  disabled?: boolean;
  children: ReactNode;
}

export interface RadioLabelProps {
  children: ReactNode;
}

export interface RadioSubLabelProps {
  children: ReactNode;
}
