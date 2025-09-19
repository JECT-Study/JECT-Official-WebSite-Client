import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BadgeSize, ContentBadgeStyle, FeedbackVariant } from '../badge.types';
import { CONTENT_BADGE_SIZE } from '../badge.variants';
import {
  CONTENT_FEEDBACK_BADGE_STYLE,
  CONTENT_FEEDBACK_BADGE_STYLE_MUTED,
} from './contentFeedbackBadge.variants';

interface ContentFeedbackBadgeDivProps {
  variant: FeedbackVariant;
  size: BadgeSize;
  badgeStyle: ContentBadgeStyle;
  isMuted: boolean;
}

export const ContentFeedbackBadgeDiv = styled.div<ContentFeedbackBadgeDivProps>(
  ({ theme, variant, size, badgeStyle, isMuted }) => {
    const backgroundColor = isMuted
      ? CONTENT_FEEDBACK_BADGE_STYLE_MUTED(theme)[badgeStyle][variant].bg
      : CONTENT_FEEDBACK_BADGE_STYLE(theme)[badgeStyle][variant].bg;
    const color = isMuted
      ? CONTENT_FEEDBACK_BADGE_STYLE_MUTED(theme)[badgeStyle][variant].color
      : CONTENT_FEEDBACK_BADGE_STYLE(theme)[badgeStyle][variant].color;
    const border = isMuted
      ? CONTENT_FEEDBACK_BADGE_STYLE_MUTED(theme)[badgeStyle][variant].border
      : CONTENT_FEEDBACK_BADGE_STYLE(theme)[badgeStyle][variant].border;

    return {
      minWidth: pxToRem(CONTENT_BADGE_SIZE[size].minWidth),
      padding: CONTENT_BADGE_SIZE[size].padding,
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
