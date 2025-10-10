import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BadgeSize, NumericBadgeStyle, FeedbackVariant } from '../badge.types';
import { NUMERIC_BADGE_SIZE } from '../badge.variants';
import {
  NUMERIC_FEEDBACK_BADGE_STYLE,
  NUMERIC_FEEDBACK_BADGE_STYLE_MUTED,
} from './numericFeedbackBadge.variants';

interface NumericFeedbackBadgeDivProps {
  variant: FeedbackVariant;
  size: BadgeSize;
  badgeStyle: NumericBadgeStyle;
  isMuted: boolean;
}

export const NumericFeedbackBadgeDiv = styled.div<NumericFeedbackBadgeDivProps>(
  ({ theme, variant, size, badgeStyle, isMuted }) => {
    const backgroundColor = isMuted
      ? NUMERIC_FEEDBACK_BADGE_STYLE_MUTED(theme)[badgeStyle][variant].bg
      : NUMERIC_FEEDBACK_BADGE_STYLE(theme)[badgeStyle][variant].bg;
    const color = isMuted
      ? NUMERIC_FEEDBACK_BADGE_STYLE_MUTED(theme)[badgeStyle][variant].color
      : NUMERIC_FEEDBACK_BADGE_STYLE(theme)[badgeStyle][variant].color;

    return {
      minWidth: pxToRem(NUMERIC_BADGE_SIZE[size].minWidth),
      padding: `${pxToRem(NUMERIC_BADGE_SIZE[size].paddingTopBottom)} ${pxToRem(NUMERIC_BADGE_SIZE[size].paddingLeftRight)}`,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      color,
      borderRadius: theme.scheme.desktop.radius.max,
    };
  },
);
