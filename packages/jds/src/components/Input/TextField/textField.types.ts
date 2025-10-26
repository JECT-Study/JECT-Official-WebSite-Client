import type { ChangeEvent, ReactNode } from 'react';

import type { IconName } from '../../Icon/Icon.types';
import type { FieldPublicProps, FieldInputPublicProps } from '../input.types';

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
