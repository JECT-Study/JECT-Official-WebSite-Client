import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'empty' | 'outlined';
export type CheckboxAlign = 'left' | 'right';

export type CheckedState = boolean | 'indeterminate';

export interface BaseCheckboxProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'onChange'> {
  disabled?: boolean;
  isInvalid?: boolean;
  onCheckedChange?: (checked: CheckedState) => void;
}

export type CheckboxBasicProps = BaseCheckboxProps & {
  size?: CheckboxSize;
} & (
  | { isIndeterminate?: false; checked: true }
  | { isIndeterminate: true; checked?: false }
  | { isIndeterminate?: false; checked?: false }
);

type CheckboxContentBaseProps = Omit<BaseCheckboxProps, 'checked'> & {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  align?: CheckboxAlign;
  label: ReactNode;
  subLabel?: ReactNode;
};

export type CheckboxContentProps = CheckboxContentBaseProps &
  (
    | { isIndeterminate?: false; checked: true }
    | { isIndeterminate: true; checked?: false }
    | { isIndeterminate?: false; checked?: false }
  );
