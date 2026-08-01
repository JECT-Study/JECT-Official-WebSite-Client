import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import type { AriaLabelProps } from "types";

import type { ListboxContextValue } from "./ListboxContext";

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

export type ListboxProps = ComponentPropsWithoutRef<"div"> & {
  context: ListboxContextValue;
  options: SelectOption[];
  listboxRef: Ref<HTMLDivElement>;
  listboxProps: ComponentPropsWithoutRef<"div">;
  label?: string;
  width?: SelectDimension;
  height?: SelectDimension;
};
