import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { IconName } from '@/components';

export type LabelButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type LabelButtonHierarchy = 'accent' | 'primary' | 'secondary' | 'tertiary';
export type LabelButtonIntent = 'positive' | 'destructive';

export interface BaseLabelButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
  size?: LabelButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
}

export interface LabelButtonBasicProps extends BaseLabelButtonProps {
  hierarchy?: LabelButtonHierarchy;
}

export interface LabelButtonFeedbackProps extends BaseLabelButtonProps {
  intent: LabelButtonIntent;
}
