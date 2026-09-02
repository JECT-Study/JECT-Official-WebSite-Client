import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import type { AriaLabelProps } from "types";

export type SelectionMode = "single" | "multiple";
export type OptionVariant = "control" | "label";
export type SelectDimension = "full" | (string & {});

export interface ListboxBehavior {
  listboxId: string;
  disabled: boolean;
  isSelected: (value: string) => boolean;
  activeValue: string | null;
  select: (value: string) => void;
  setActive: (value: string | null) => void;
}

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

export type ListboxOptionProps = {
  value: string;
  disabled?: boolean;
  caption?: string;
  suffix?: ReactNode;
  children?: ReactNode;
};

export type ListboxCustomValueProps = {
  value: string;
  caption?: string;
};

export type ListboxProps = ComponentPropsWithoutRef<"div"> & {
  behavior: ListboxBehavior;
  selectionMode: SelectionMode;
  variant: OptionVariant;
  listboxRef: Ref<HTMLDivElement>;
  listboxProps: ComponentPropsWithoutRef<"div">;
  label?: string;
  width?: SelectDimension;
  height?: SelectDimension;
};
