import type { ComponentPropsWithoutRef } from 'react';

export type SegmentedControlSize = 'lg' | 'md' | 'sm' | 'xs';

export interface SegmentedControlRootProps extends ComponentPropsWithoutRef<'div'> {
  size?: SegmentedControlSize;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface SegmentedControlItemProps extends ComponentPropsWithoutRef<'button'> {
  value: string;
  isDisabled?: boolean;
}

export interface StyledRootProps {
  size: SegmentedControlSize;
}

export interface StyledContentProps {
  size: SegmentedControlSize;
}

export interface StyledItemProps {
  size: SegmentedControlSize;
  $isDisabled: boolean;
}
