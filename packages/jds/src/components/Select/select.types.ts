import type { ReactNode } from "react";
import type { AriaLabelProps } from "types";

export type SelectionMode = "single" | "multiple";
export type OptionVariant = "control" | "label";
export type SelectDimension = "full" | (string & {});

type SelectControlledProps = {
  value: string;
  defaultValue?: never;
  onChange: (value: string) => void;
};

type SelectUncontrolledProps = {
  value?: never;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

type SelectBaseProps = AriaLabelProps & {
  variant?: OptionVariant;
  label?: string;
  disabled?: boolean;
  width?: SelectDimension;
  height?: SelectDimension;
  children?: ReactNode;
};

export type SelectProps = SelectBaseProps & (SelectControlledProps | SelectUncontrolledProps);

type MultiSelectControlledProps = {
  value: string[];
  defaultValue?: never;
  onChange: (value: string[]) => void;
};

type MultiSelectUncontrolledProps = {
  value?: never;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type MultiSelectProps = SelectBaseProps &
  (MultiSelectControlledProps | MultiSelectUncontrolledProps);

export type SelectOptionProps = {
  value: string;
  disabled?: boolean;
  caption?: string;
  suffix?: ReactNode;
  children?: ReactNode;
};
