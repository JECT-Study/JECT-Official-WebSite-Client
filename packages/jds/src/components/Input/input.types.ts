import type { ComponentPropsWithoutRef } from 'react';

export type InputStyle = 'outlined' | 'empty';

export type InputLayout = 'vertical' | 'horizontal';

export type InputValidation = 'none' | 'error' | 'success';

export interface FieldPublicProps {
  style?: InputStyle;
  layout?: InputLayout;
  validation?: InputValidation;
  disabled?: boolean;
  readOnly?: boolean;
}

export type FieldInputPublicProps = Omit<ComponentPropsWithoutRef<'input'>, 'style'>;

export type FieldTextAreaPublicProps = Omit<ComponentPropsWithoutRef<'textarea'>, 'style'>;
