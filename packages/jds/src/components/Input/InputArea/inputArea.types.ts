import type { ChangeEvent, ComponentPropsWithoutRef } from 'react';

import type { IconName } from '../../Icon/Icon.types';
import type { InputInteraction } from '../input.types';

export type InputAreaStyle = 'outlined' | 'empty';
export type InputAreaLayout = 'vertical' | 'horizontal';
export type InputAreaValidation = 'none' | 'error';

export type InputAreaStatus = 'placeholder' | 'filled';

export interface InputAreaPublicProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'style'> {
  style?: InputAreaStyle;
  layout?: InputAreaLayout;
  validation?: InputAreaValidation;
  interaction?: InputInteraction;
  label?: string;
  labelIcon?: IconName;
  labelVisible?: boolean;
  helperText?: string;
  maxLength?: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export type InputAreaProps = InputAreaPublicProps;
