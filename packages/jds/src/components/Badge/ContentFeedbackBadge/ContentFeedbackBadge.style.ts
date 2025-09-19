import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BadgeSize, BadgeType, FeedbackVariant } from '../badge.types';
import { BADGE_SIZE } from '../badge.variants';
import {
  CONTENT_FEEDBACK_BADGE_STYLE,
  CONTENT_FEEDBACK_BADGE_STYLE_MUTED,
} from './contentFeedbackBadge.variants';

interface ContentFeedbackBadgeDivProps {
  variant: FeedbackVariant;
  size: BadgeSize;
  type: BadgeType;
  isMuted: boolean;
}

export const ContentFeedbackBadgeDiv = styled.div<ContentFeedbackBadgeDivProps>(
  ({ theme, variant, size, type, isMuted }) => {
    const backgroundColor = isMuted
      ? CONTENT_FEEDBACK_BADGE_STYLE_MUTED(theme)[type][variant].bg
      : CONTENT_FEEDBACK_BADGE_STYLE(theme)[type][variant].bg;
    const color = isMuted
      ? CONTENT_FEEDBACK_BADGE_STYLE_MUTED(theme)[type][variant].color
      : CONTENT_FEEDBACK_BADGE_STYLE(theme)[type][variant].color;
    const border = isMuted
      ? CONTENT_FEEDBACK_BADGE_STYLE_MUTED(theme)[type][variant].border
      : CONTENT_FEEDBACK_BADGE_STYLE(theme)[type][variant].border;

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
