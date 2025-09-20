import { Theme } from '@emotion/react';
import { BadgeStyle, FeedbackVariant } from '../badge.types';

type ContentFeedbackBadgeStyle = {
  solid: Record<FeedbackVariant, BadgeStyle>;
  alpha: Record<FeedbackVariant, BadgeStyle>;
  outlined: Record<FeedbackVariant, BadgeStyle>;
};

export const CONTENT_FEEDBACK_BADGE_STYLE = (theme: Theme): ContentFeedbackBadgeStyle => ({
  solid: {
    positive: {
      bg: theme.color.feedback.positive.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    destructive: {
      bg: theme.color.feedback.destructive.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    notifying: {
      bg: theme.color.feedback.notifying.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
  },
  alpha: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtle,
      color: theme.color.feedback.positive.normal,
      border: 'none',
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtle,
      color: theme.color.feedback.destructive.normal,
      border: 'none',
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtle,
      color: theme.color.feedback.notifying.normal,
      border: 'none',
    },
  },
  outlined: {
    positive: {
      bg: 'none',
      color: theme.color.feedback.positive.normal,
      border: theme.color.feedback.positive.alpha.neutral,
    },
    destructive: {
      bg: 'none',
      color: theme.color.feedback.destructive.normal,
      border: theme.color.feedback.destructive.alpha.neutral,
    },
    notifying: {
      bg: 'none',
      color: theme.color.feedback.notifying.normal,
      border: theme.color.feedback.notifying.alpha.neutral,
    },
  },
});

export const CONTENT_FEEDBACK_BADGE_STYLE_MUTED = (theme: Theme): ContentFeedbackBadgeStyle => ({
  solid: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtle,
      color: theme.color.feedback.positive.alpha.alternative,
      border: 'none',
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtle,
      color: theme.color.feedback.destructive.alpha.alternative,
      border: 'none',
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtle,
      color: theme.color.feedback.notifying.alpha.alternative,
      border: 'none',
    },
  },
  alpha: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtlest,
      color: theme.color.feedback.positive.alpha.assistive,
      border: 'none',
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtlest,
      color: theme.color.feedback.destructive.alpha.assistive,
      border: 'none',
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtlest,
      color: theme.color.feedback.notifying.alpha.assistive,
      border: 'none',
    },
  },
  outlined: {
    positive: {
      bg: 'none',
      color: theme.color.feedback.positive.alpha.subtle,
      border: theme.color.feedback.positive.alpha.assistive,
    },
    destructive: {
      bg: 'none',
      color: theme.color.feedback.destructive.alpha.subtle,
      border: theme.color.feedback.destructive.alpha.assistive,
    },
    notifying: {
      bg: 'none',
      color: theme.color.feedback.notifying.alpha.subtle,
      border: theme.color.feedback.notifying.alpha.assistive,
    },
  },
});
