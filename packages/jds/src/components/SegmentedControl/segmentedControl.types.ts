import type { ToggleGroupItemProps, ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';

export type SegmentedControlSize = 'lg' | 'md' | 'sm' | 'xs';

export interface SegmentedControlRootProps extends Omit<ToggleGroupSingleProps, 'type'> {
  size?: SegmentedControlSize;
}

export type SegmentedControlItemProps = ToggleGroupItemProps;

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
