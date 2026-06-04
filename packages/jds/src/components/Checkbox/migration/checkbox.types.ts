import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const CHECKBOX_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const CHECKBOX_STYLE_OPTIONS = ["empty", "outlined"] as const;
export const CHECKBOX_ALIGN_OPTIONS = ["left", "right"] as const;

export type CheckboxSize = (typeof CHECKBOX_SIZE_OPTIONS)[number];
export type CheckboxStyle = (typeof CHECKBOX_STYLE_OPTIONS)[number];
export type CheckboxAlign = (typeof CHECKBOX_ALIGN_OPTIONS)[number];
export type CheckState = boolean | "indeterminate";

// Checkbox.Root

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
  checkboxSize?: CheckboxSize;
  checkboxStyle?: CheckboxStyle;
  checkboxAlign?: CheckboxAlign;
  disabled?: boolean;
  isInvalid?: boolean;
  name?: string;
  children: ReactNode;
};

export type CheckboxRootProps = CheckboxRootBaseProps &
  (CheckboxRootControlledProps | CheckboxRootUncontrolledProps);

// Checkbox.Item

export interface CheckboxItemProps extends ComponentPropsWithoutRef<"div"> {
  checkboxSize?: CheckboxSize;
  checkboxStyle?: CheckboxStyle;
  checkboxAlign?: CheckboxAlign;
  disabled?: boolean;
  isInvalid?: boolean;
  children: ReactNode;
}

// Checkbox.Basic
// Checkbox.Root 안에서 사용 시 value가 그룹 내 식별자가 되며 checked 상태는 그룹이 관리한다.

type CheckboxBasicControlledProps = {
  checked: CheckState;
  defaultChecked?: never;
  onCheckedChange: (checked: CheckState) => void;
};

type CheckboxBasicUncontrolledProps = {
  checked?: never;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: CheckState) => void;
};

type CheckboxBasicBaseProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "size" | "checked" | "defaultChecked" | "onChange"
> & {
  checkboxSize?: CheckboxSize;
  value?: string;
  disabled?: boolean;
  isInvalid?: boolean;
};

export type CheckboxBasicProps = CheckboxBasicBaseProps &
  (CheckboxBasicControlledProps | CheckboxBasicUncontrolledProps);

// Checkbox.Label

export interface CheckboxLabelProps {
  children: ReactNode;
}

// Checkbox.SubLabel

export interface CheckboxSubLabelProps {
  children: ReactNode;
}
