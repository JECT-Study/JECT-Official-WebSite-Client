import type { Theme } from '@emotion/react';

import type { BadgeSize } from './badge.types';

export const contentBadgeSizeMap: Record<
  BadgeSize,
  { minWidth: number; paddingTopBottom: number; paddingLeftRight: number; textStyle: keyof Theme['textStyle'] }
> = {
  lg: {
    minWidth: 28,
    paddingTopBottom: 2,
    paddingLeftRight: 6,
    textStyle: 'semantic-textStyle-label-lg-normal',
  },
  md: {
    minWidth: 27,
    paddingTopBottom: 2,
    paddingLeftRight: 6,
    textStyle: 'semantic-textStyle-label-md-normal',
  },
  sm: {
    minWidth: 24,
    paddingTopBottom: 2,
    paddingLeftRight: 6,
    textStyle: 'semantic-textStyle-label-sm-normal',
  },
  xs: {
    minWidth: 20,
    paddingTopBottom: 1,
    paddingLeftRight: 4,
    textStyle: 'semantic-textStyle-label-xs-normal',
  },
};

export const numericBadgeSizeMap: Record<
  BadgeSize,
  { minWidth: number; paddingTopBottom: number; paddingLeftRight: number; textStyle: keyof Theme['textStyle'] }
> = {
  lg: {
    minWidth: 24,
    paddingTopBottom: 0,
    paddingLeftRight: 8,
    textStyle: 'semantic-textStyle-label-lg-subtle',
  },
  md: {
    minWidth: 23,
    paddingTopBottom: 0,
    paddingLeftRight: 8,
    textStyle: 'semantic-textStyle-label-md-subtle',
  },
  sm: {
    minWidth: 20,
    paddingTopBottom: 0,
    paddingLeftRight: 6,
    textStyle: 'semantic-textStyle-label-sm-subtle',
  },
  xs: {
    minWidth: 18,
    paddingTopBottom: 0,
    paddingLeftRight: 6,
    textStyle: 'semantic-textStyle-label-xs-subtle',
  },
};

export const dotBadgeSizeMap: Record<BadgeSize, { width: number; height: number }> = {
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
