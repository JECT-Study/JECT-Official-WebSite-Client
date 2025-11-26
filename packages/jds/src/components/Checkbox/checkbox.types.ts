import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type CheckboxSize = "xs" | "sm" | "md" | "lg";
export type CheckboxVariant = "empty" | "outlined";
export type CheckboxAlign = "left" | "right";

export type CheckedState = boolean | "indeterminate";

interface CheckboxCommonProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "size" | "onChange" | "checked" | "defaultChecked"
  > {
  disabled?: boolean;
  isInvalid?: boolean;
  size?: CheckboxSize;
  onCheckedChange?: (checked: CheckedState) => void;
}

export interface CheckboxBoxProps extends CheckboxCommonProps {
  checked: boolean;
  isIndeterminate: boolean;
}

export interface CheckboxBasicProps extends CheckboxCommonProps {
  checked?: CheckedState;
}

export interface CheckboxContentProps extends CheckboxCommonProps {
  variant?: CheckboxVariant;
  align?: CheckboxAlign;
  label: ReactNode;
  subLabel?: ReactNode;
  checked?: CheckedState;
}
