import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { IconName } from '@/components';

export type BlockButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type BlockButtonHierarchy = 'accent' | 'primary' | 'secondary' | 'tertiary';
export type BlockButtonStyle = 'solid' | 'outlined' | 'empty';
export type FeedbackIntent = 'positive' | 'destructive';

export interface BaseBlockButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  size?: BlockButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
}

export interface BlockButtonBasicProps extends BaseBlockButtonProps {
  variant?: BlockButtonStyle;
  hierarchy?: BlockButtonHierarchy;
}

export interface BlockButtonFeedbackProps extends BaseBlockButtonProps {
  intent: FeedbackIntent;
}