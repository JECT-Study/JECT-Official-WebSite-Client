import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const RADIO_SIZE_OPTIONS = ["lg", "md", "sm", "xs"] as const;
export const RADIO_STYLE_OPTIONS = ["empty", "outline"] as const;
export const RADIO_ALIGN_OPTIONS = ["left", "right"] as const;

export type RadioSize = (typeof RADIO_SIZE_OPTIONS)[number];
export type RadioStyle = (typeof RADIO_STYLE_OPTIONS)[number];
export type RadioAlign = (typeof RADIO_ALIGN_OPTIONS)[number];

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
