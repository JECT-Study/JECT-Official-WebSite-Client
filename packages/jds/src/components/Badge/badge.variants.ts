import { TextStyle } from 'types';
import { BadgeSize } from './badge.types';

export const CONTENT_BADGE_SIZE: Record<
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

export const NUMERIC_BADGE_SIZE: Record<
  BadgeSize,
  { minWidth: number; padding: string; textStyle: TextStyle }
> = {
  lg: {
    minWidth: 24,
    padding: '0px 8px',
    textStyle: 'label.lg.subtle',
  },
  md: {
    minWidth: 23,
    padding: '0px 8px',
    textStyle: 'label.md.subtle',
  },
  sm: {
    minWidth: 20,
    padding: '0px 6px',
    textStyle: 'label.sm.subtle',
  },
  xs: {
    minWidth: 18,
    padding: '0px 6px',
    textStyle: 'label.xs.subtle',
  },
};

export const DOT_BADGE_SIZE: Record<BadgeSize, { width: number; height: number }> = {
  lg: {
    width: 16,
    height: 16,
  },
  md: {
    width: 12,
    height: 12,
  },
  sm: {
    width: 8,
    height: 8,
  },
  xs: {
    width: 4,
    height: 4,
  },
};
