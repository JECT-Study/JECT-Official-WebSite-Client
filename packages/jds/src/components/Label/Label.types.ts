import { ReactNode } from 'react';

export type LabelSize = 'lg' | 'md' | 'sm' | 'xs';
export type LabelTextAlign = 'left' | 'center' | 'right';
export type LabelWeight = 'bold' | 'normal' | 'subtle';

export interface LabelProps {
  size: LabelSize;
  textAlign: LabelTextAlign;
  weight: LabelWeight;
  color?: string;
  children: ReactNode;
}

export interface StyledLabelProps {
  size: LabelSize;
  textAlign: LabelTextAlign;
  weight: LabelWeight;
  color: string;
}
