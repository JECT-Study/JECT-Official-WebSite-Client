import { ReactNode } from 'react';
import { BaseBlockButtonProps } from '../Button/BlockButton/blockButton.types';

export type BasicHierarchy = 'accent' | 'primary' | 'secondary';
export type FeedbackHierarchy = 'positive' | 'destructive' | 'notifying';
export type CalloutVariant = 'hero' | 'hint';
export type CalloutSize = 'lg' | 'md' | 'sm' | 'xs' | '2xs';

export interface BaseCalloutProps {
  variant?: CalloutVariant;
  size?: CalloutSize;
  titleVisible?: boolean;
  extraButtonVisible?: boolean;
  title?: string;
  blockButtonProps?: Omit<BaseBlockButtonProps, 'size'>;
  children: ReactNode;
}

export interface BasicCalloutProps extends BaseCalloutProps {
  hierarchy: BasicHierarchy;
}

export interface FeedbackCalloutProps extends BaseCalloutProps {
  feedback: FeedbackHierarchy;
}

export interface CalloutBasicDivProps {
  hierarchy: BasicHierarchy;
  variant: CalloutVariant;
  size: CalloutSize;
}

export interface CalloutFeedbackDivProps {
  hierarchy: FeedbackHierarchy;
  variant: CalloutVariant;
  size: CalloutSize;
}

export interface CalloutPProps {
  size: CalloutSize;
}
