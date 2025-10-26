import type { ReactNode } from 'react';

import type { IconName } from '../../Icon/Icon.types';
import type { FieldPublicProps } from '../TextField';

export interface SelectFieldPublicProps extends FieldPublicProps {
  label?: string;
  labelIcon?: IconName;
  helperText?: string;
  value: string;
  placeholder?: string;
  dropdownIcon?: IconName;
  isOpen?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export type SelectFieldProps = SelectFieldPublicProps;
