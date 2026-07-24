import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { AriaLabelProps, RenderableNode } from "types";

export const CHECKBOX_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const CHECKBOX_VARIANT_OPTIONS = ["hollow", "outlined"] as const;

export type CheckboxSize = (typeof CHECKBOX_SIZE_OPTIONS)[number];
export type CheckboxVariant = (typeof CHECKBOX_VARIANT_OPTIONS)[number];

type CheckboxRootLayoutProps =
  | { layout?: "vertical"; columns?: never }
  | { layout: "grid"; columns: number };
export type CheckedState = boolean | "indeterminate";

type CheckboxRootControlledProps = {
  value: string[];
  defaultValue?: never;
  onChange: (value: string[]) => void;
};

type CheckboxRootUncontrolledProps = {
  value?: never;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

type CheckboxRootBaseProps = {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  disabled?: boolean;
  isInvalid?: boolean;
  stretched?: boolean;
  name?: string;
  children: ReactNode;
};

export type CheckboxRootProps = CheckboxRootBaseProps &
  AriaLabelProps &
  CheckboxRootLayoutProps &
  (CheckboxRootControlledProps | CheckboxRootUncontrolledProps);

export type CheckboxItemProps = ComponentPropsWithoutRef<"label"> & {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  disabled?: boolean;
  isInvalid?: boolean;
  stretched?: boolean;
  children: ReactNode;
};

type CheckboxControlControlledProps = {
  checked: CheckedState;
  defaultChecked?: never;
  onCheckedChange: (checked: CheckedState) => void;
};

type CheckboxControlUncontrolledProps = {
  checked?: never;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: CheckedState) => void;
};

type CheckboxControlBaseProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "size" | "checked" | "defaultChecked" | "onChange" | "value" | "type"
> & {
  size?: CheckboxSize;
  value?: string;
  disabled?: boolean;
  isInvalid?: boolean;
};

export type CheckboxControlProps = CheckboxControlBaseProps &
  (CheckboxControlControlledProps | CheckboxControlUncontrolledProps);

export type CheckboxIndicatorProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  size?: CheckboxSize;
  state?: CheckedState;
  disabled?: boolean;
  isInvalid?: boolean;
};

export type CheckboxLabelProps = {
  children: ReactNode;
};

export type CheckboxHelperProps = {
  children: ReactNode;
};

export type CheckboxOption = {
  value: string;
  label: RenderableNode;
  helper?: ReactNode;
  disabled?: boolean;
  isInvalid?: boolean;
};

type CheckboxGroupBaseProps = {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  disabled?: boolean;
  isInvalid?: boolean;
  stretched?: boolean;
  name?: string;
  options: CheckboxOption[];
};

export type CheckboxGroupProps = CheckboxGroupBaseProps &
  AriaLabelProps &
  CheckboxRootLayoutProps &
  (CheckboxRootControlledProps | CheckboxRootUncontrolledProps);

type CheckboxStandaloneBaseProps = Omit<
  ComponentPropsWithoutRef<"button">,
  | "size"
  | "checked"
  | "defaultChecked"
  | "onChange"
  | "value"
  | "type"
  | "aria-label"
  | "aria-labelledby"
> &
  AriaLabelProps & {
    size?: CheckboxSize;
    variant?: CheckboxVariant;
    disabled?: boolean;
    isInvalid?: boolean;
    stretched?: boolean;
    name?: string;
    value?: string;
  };

type CheckboxLabelHelperProps =
  | { label?: RenderableNode; helper?: never }
  | { label: RenderableNode; helper?: ReactNode };

export type CheckboxProps = CheckboxStandaloneBaseProps &
  CheckboxLabelHelperProps &
  (CheckboxControlControlledProps | CheckboxControlUncontrolledProps);
