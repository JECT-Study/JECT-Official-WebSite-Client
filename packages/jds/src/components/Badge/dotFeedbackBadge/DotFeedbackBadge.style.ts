import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BadgeSize, FeedbackVariant } from '../badge.types';
import { DOT_BADGE_SIZE } from '../badge.variants';
import {
  DOT_FEEDBACK_BADGE_STYLE,
  DOT_FEEDBACK_BADGE_STYLE_MUTED,
} from './dotFeedbackBadge.variants';

interface DotFeedbackBadgeDivProps {
  variant: FeedbackVariant;
  size: BadgeSize;
  isMuted: boolean;
}

export const DotFeedbackBadgeDiv = styled.div<DotFeedbackBadgeDivProps>(
  ({ theme, variant, size, isMuted }) => {
    const backgroundColor = isMuted
      ? DOT_FEEDBACK_BADGE_STYLE_MUTED(theme)[variant].bg
      : DOT_FEEDBACK_BADGE_STYLE(theme)[variant].bg;

    return {
      width: pxToRem(DOT_BADGE_SIZE[size].width),
      height: pxToRem(DOT_BADGE_SIZE[size].height),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      aspectRatio: '1/1',
      backgroundColor,
      borderRadius: theme.scheme.desktop.radius.max,
    };
  },
);
