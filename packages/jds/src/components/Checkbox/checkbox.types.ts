import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'empty' | 'outlined';
export type CheckboxAlign = 'left' | 'right';

export type CheckedState = boolean | 'indeterminate';

interface CheckboxCommonProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'onChange'> {
  disabled?: boolean;
  isInvalid?: boolean;
  size?: CheckboxSize;
  onCheckedChange?: (checked: CheckedState) => void;
}

export interface CheckboxBoxProps extends CheckboxCommonProps {
  checked: boolean;
  isIndeterminate: boolean;
}

export type CheckboxBasicProps = CheckboxCommonProps &
  (
    | { isIndeterminate?: false; checked: true }
    | { isIndeterminate: true; checked?: false }
    | { isIndeterminate?: false; checked?: false }
  );

type CheckboxContentBaseProps = Omit<CheckboxCommonProps, 'checked'> & {
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
