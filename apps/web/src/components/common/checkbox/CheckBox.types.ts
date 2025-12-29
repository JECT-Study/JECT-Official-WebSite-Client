import type { ComponentPropsWithoutRef } from "react";

export type CheckBoxProps = ComponentPropsWithoutRef<"input"> & {
  isIndeterminate?: boolean;
  disabled?: boolean;
  checked?: boolean;
  labelText?: string;
} & (
    | { isIndeterminate?: false; checked: true }
    | { isIndeterminate: true; checked?: false }
    | { isIndeterminate?: false; checked?: false }
  );

export type CheckBoxIconProps = {
  checked?: boolean;
  disabled?: boolean;
  isIndeterminate?: boolean;
};
