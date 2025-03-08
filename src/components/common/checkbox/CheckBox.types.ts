import type { ComponentPropsWithoutRef } from 'react';

export type CheckboxProps = ComponentPropsWithoutRef<'input'> & {
  isIndeterminate?: boolean;
  disabled?: boolean;
  checked?: boolean;
  labelText?: string;
} & (
    | { isIndeterminate?: false; checked: true }
    | { isIndeterminate: true; checked?: false }
    | { isIndeterminate?: false; checked?: false }
  );

export type CheckboxIconProps = {
  checked?: boolean;
  disabled?: boolean;
  isIndeterminate?: boolean;
};
