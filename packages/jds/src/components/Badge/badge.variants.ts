import { TextStyle } from 'types';
import { BadgeSize } from './badge.types';

export const BADGE_SIZE: Record<
  BadgeSize,
  { minWidth: number; padding: string; textStyle: TextStyle }
> = {
  lg: {
    minWidth: 28,
    padding: '2px 6px',
    textStyle: 'label.lg.normal',
  },
  md: {
    minWidth: 27,
    padding: '2px 6px',
    textStyle: 'label.md.normal',
  },
  sm: {
    minWidth: 24,
    padding: '2px 6px',
    textStyle: 'label.sm.normal',
  },
  xs: {
    minWidth: 20,
    padding: '1px 4px',
    textStyle: 'label.xs.normal',
  },
};
