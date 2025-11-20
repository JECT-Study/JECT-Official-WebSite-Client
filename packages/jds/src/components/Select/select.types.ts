import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type SelectVariant = 'list' | 'checkbox' | 'radio';
export type SelectSize = 'md' | 'sm';

export type SelectValue = string | string[];

export interface SelectContextType {
  value: SelectValue;
  variant: SelectVariant;
  size: SelectSize;
  onChange: (value: string) => void;
  isSelected: (value: string) => boolean;
}

export interface BaseSelectProps {
  size?: SelectSize;
  label?: string;
  children?: ReactNode;
}

export interface SelectListProps
  extends BaseSelectProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'size' | 'onChange'> {
  variant?: 'list';
  value: string;
  onChange: (value: string) => void;
}

export interface SelectRadioVariantProps
  extends BaseSelectProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'size' | 'onChange'> {
  variant: 'radio';
  value: string;
  onChange: (value: string) => void;
}

export interface SelectCheckboxVariantProps
  extends BaseSelectProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'size' | 'onChange'> {
  variant: 'checkbox';
  value: string[];
  onChange: (value: string[]) => void;
}

export type SelectProps = SelectListProps | SelectRadioVariantProps | SelectCheckboxVariantProps;

export interface BaseSelectItemProps {
  value: string;
  isDisabled?: boolean;
  caption?: string;
  children?: ReactNode;
}

export interface SelectLabelProps
  extends BaseSelectItemProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'onClick'> {
  badge?: ReactNode;
}

export interface SelectRadioProps
  extends BaseSelectItemProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'onClick'> {}

export interface SelectCheckboxProps
  extends BaseSelectItemProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'onClick'> {}
