import type { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from 'react';

import type { IconName } from '../../Icon/Icon.types';

export type TextFieldStyle = 'outlined' | 'empty';
export type TextFieldLayout = 'vertical' | 'horizontal';
export type TextFieldValidation = 'none' | 'error' | 'success';

export interface FieldPublicProps {
  style?: TextFieldStyle;
  layout?: TextFieldLayout;
  validation?: TextFieldValidation;
  disabled?: boolean;
  readOnly?: boolean;
}

export type FieldInputPublicProps = Omit<ComponentPropsWithoutRef<'input'>, 'style'>;

export interface BaseTextFieldProps extends FieldInputPublicProps {}

export interface TextFieldPublicProps
  extends FieldPublicProps,
    Omit<FieldInputPublicProps, 'value' | 'onChange' | 'defaultValue'> {
  label?: string;
  labelIcon?: IconName;
  helperText?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type TextFieldProps = TextFieldPublicProps;

export interface TextFieldButtonProps extends TextFieldPublicProps {
  button: ReactNode;
}
