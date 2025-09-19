import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BadgeSize, BadgeType, FeedbackVariant } from '../badge.types';
import { FEEDBACK_BADGE_STYLE, FEEDBACK_BADGE_STYLE_MUTED } from './feedbackBadge.variants';
import { BADGE_SIZE } from '../badge.variants';

interface FeedbackBadgeDivProps {
  variant: FeedbackVariant;
  size: BadgeSize;
  type: BadgeType;
  isMuted: boolean;
}

export const FeedbackBadgeDiv = styled.div<FeedbackBadgeDivProps>(
  ({ theme, variant, size, type, isMuted }) => {
    const backgroundColor = isMuted
      ? FEEDBACK_BADGE_STYLE_MUTED(theme)[type][variant].bg
      : FEEDBACK_BADGE_STYLE(theme)[type][variant].bg;
    const color = isMuted
      ? FEEDBACK_BADGE_STYLE_MUTED(theme)[type][variant].color
      : FEEDBACK_BADGE_STYLE(theme)[type][variant].color;
    const border = isMuted
      ? FEEDBACK_BADGE_STYLE_MUTED(theme)[type][variant].border
      : FEEDBACK_BADGE_STYLE(theme)[type][variant].border;

    return {
      minWidth: pxToRem(BADGE_SIZE[size].minWidth),
      padding: BADGE_SIZE[size].padding,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0px',
      backgroundColor,
      color,
      border: `1px solid ${border}`,
      borderRadius: theme.scheme.desktop.radius[4],
    };
  },
);
