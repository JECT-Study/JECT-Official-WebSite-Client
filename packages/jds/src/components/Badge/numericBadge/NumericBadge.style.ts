import styled from '@emotion/styled';
import { pxToRem } from 'utils';

import type { BasicHierarchy, BadgeSize, NumericBadgeStyle, FeedbackVariant } from '../badge.types';
import { numericBadgeSizeMap } from '../badge.variants';
import {
  numericBadgeBasicStylesMap,
  numericBadgeBasicMutedStylesMap,
  numericBadgeFeedbackStylesMap,
  numericBadgeFeedbacksMutedStylesMap,
} from './numericBadge.variants';

interface NumericBadgeBasicDivProps {
  hierarchy: BasicHierarchy;
  size: BadgeSize;
  badgeStyle: NumericBadgeStyle;
  isMuted: boolean;
}

export const NumericBadgeBasicDiv = styled.div<NumericBadgeBasicDivProps>(
  ({ theme, hierarchy, size, badgeStyle, isMuted }) => {
    const backgroundColor = isMuted
      ? numericBadgeBasicMutedStylesMap(theme)[badgeStyle].bg
      : numericBadgeBasicStylesMap(theme)[badgeStyle][hierarchy].bg;
    const color = isMuted
      ? numericBadgeBasicMutedStylesMap(theme)[badgeStyle].color
      : numericBadgeBasicStylesMap(theme)[badgeStyle][hierarchy].color;

    return {
      minWidth: pxToRem(numericBadgeSizeMap[size].minWidth),
      padding: `${pxToRem(numericBadgeSizeMap[size].paddingTopBottom)} ${pxToRem(numericBadgeSizeMap[size].paddingLeftRight)}`,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      color,
      borderRadius: theme.scheme.semantic.radius.max,
    };
  },
);

interface NumericBadgeFeedbackDivProps {
  variant: FeedbackVariant;
  size: BadgeSize;
  badgeStyle: NumericBadgeStyle;
  isMuted: boolean;
}

export const NumericBadgeFeedbackDiv = styled.div<NumericBadgeFeedbackDivProps>(
  ({ theme, variant, size, badgeStyle, isMuted }) => {
    const backgroundColor = isMuted
      ? numericBadgeFeedbacksMutedStylesMap(theme)[badgeStyle][variant].bg
      : numericBadgeFeedbackStylesMap(theme)[badgeStyle][variant].bg;
    const color = isMuted
      ? numericBadgeFeedbacksMutedStylesMap(theme)[badgeStyle][variant].color
      : numericBadgeFeedbackStylesMap(theme)[badgeStyle][variant].color;

    return {
      minWidth: pxToRem(numericBadgeSizeMap[size].minWidth),
      padding: `${pxToRem(numericBadgeSizeMap[size].paddingTopBottom)} ${pxToRem(numericBadgeSizeMap[size].paddingLeftRight)}`,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      color,
      borderRadius: theme.scheme.semantic.radius.max,
    };
  },
);
