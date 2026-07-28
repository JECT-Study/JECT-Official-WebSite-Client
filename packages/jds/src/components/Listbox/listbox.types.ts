import type { ReactNode } from "react";
import type { AriaLabelProps } from "types";

export type SelectionMode = "single" | "multiple";
export type OptionVariant = "control" | "label";
export type SelectDimension = "full" | (string & {});

export type SelectOption = {
  value: string;
  label: string;
  caption?: string;
  suffix?: ReactNode;
  disabled?: boolean;
};

export type SelectBaseProps = AriaLabelProps & {
  variant?: OptionVariant;
  label?: string;
  disabled?: boolean;
  width?: SelectDimension;
  height?: SelectDimension;
  options: SelectOption[];
};

export type OptionProps = {
  value: string;
  disabled?: boolean;
  caption?: string;
  suffix?: ReactNode;
  children?: ReactNode;
};

type ListboxBaseProps = {
  variant: OptionVariant;
  disabled: boolean;
  label?: string;
  width?: SelectDimension;
  height?: SelectDimension;
  options: SelectOption[];
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

type ListboxSingleProps = {
  mode: "single";
  value?: string | null;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

type ListboxMultipleProps = {
  mode: "multiple";
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type ListboxProps = ListboxBaseProps & (ListboxSingleProps | ListboxMultipleProps);
