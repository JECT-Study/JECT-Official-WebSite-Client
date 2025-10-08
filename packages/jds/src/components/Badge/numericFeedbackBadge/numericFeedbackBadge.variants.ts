import { Theme } from '@emotion/react';
import { BadgeStyleWithoutBorder, FeedbackVariant } from '../badge.types';

type ContentFeedbackBadgeStyle = {
  solid: Record<FeedbackVariant, BadgeStyleWithoutBorder>;
  empty: Record<FeedbackVariant, BadgeStyleWithoutBorder>;
};

export const NUMERIC_FEEDBACK_BADGE_STYLE = (theme: Theme): ContentFeedbackBadgeStyle => ({
  solid: {
    positive: {
      bg: theme.color.feedback.positive.neutral,
      color: theme.color.object.static.inverse.boldest,
    },
    destructive: {
      bg: theme.color.feedback.destructive.neutral,
      color: theme.color.object.inverse.boldest,
    },
    notifying: {
      bg: theme.color.feedback.notifying.neutral,
      color: theme.color.object.static.inverse.boldest,
    },
  },
  empty: {
    positive: {
      bg: 'none',
      color: theme.color.feedback.positive.normal,
    },
    destructive: {
      bg: 'none',
      color: theme.color.feedback.destructive.normal,
    },
    notifying: {
      bg: 'none',
      color: theme.color.feedback.notifying.normal,
    },
  },
});

export const NUMERIC_FEEDBACK_BADGE_STYLE_MUTED = (theme: Theme): ContentFeedbackBadgeStyle => ({
  solid: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtler,
      color: theme.color.feedback.positive.alpha.subtle,
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtler,
      color: theme.color.feedback.destructive.alpha.subtle,
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtler,
      color: theme.color.feedback.notifying.alpha.subtle,
    },
  },
  empty: {
    positive: {
      bg: 'none',
      color: theme.color.feedback.positive.alpha.subtle,
    },
    destructive: {
      bg: 'none',
      color: theme.color.feedback.destructive.alpha.subtle,
    },
    notifying: {
      bg: 'none',
      color: theme.color.feedback.notifying.alpha.subtle,
    },
  },
});
