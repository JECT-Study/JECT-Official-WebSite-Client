import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const CHECKBOX_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const CHECKBOX_VARIANT_OPTIONS = ["hollow", "outlined"] as const;

export type CheckboxSize = (typeof CHECKBOX_SIZE_OPTIONS)[number];
export type CheckboxVariant = (typeof CHECKBOX_VARIANT_OPTIONS)[number];
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
  name?: string;
  children: ReactNode;
};

export type CheckboxRootProps = CheckboxRootBaseProps &
  (CheckboxRootControlledProps | CheckboxRootUncontrolledProps);

export type CheckboxItemProps = ComponentPropsWithoutRef<"label"> & {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  disabled?: boolean;
  isInvalid?: boolean;
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

export type CheckboxLabelProps = {
  children: ReactNode;
};

export type CheckboxHelperProps = {
  children: ReactNode;
};
