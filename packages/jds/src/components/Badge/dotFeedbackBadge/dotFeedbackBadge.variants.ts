import { Theme } from '@emotion/react';
import { FeedbackVariant } from '../badge.types';

export const DOT_FEEDBACK_BADGE_STYLE = (
  theme: Theme,
): Record<FeedbackVariant, { bg: string }> => ({
  positive: {
    bg: theme.color.feedback.positive.neutral,
  },
  destructive: {
    bg: theme.color.feedback.destructive.neutral,
  },
  notifying: {
    bg: theme.color.feedback.notifying.neutral,
  },
});

export const DOT_FEEDBACK_BADGE_STYLE_MUTED = (
  theme: Theme,
): Record<FeedbackVariant, { bg: string }> => ({
  positive: {
    bg: theme.color.feedback.positive.alpha.subtle,
  },
  destructive: {
    bg: theme.color.feedback.destructive.alpha.subtle,
  },
  notifying: {
    bg: theme.color.feedback.notifying.alpha.subtle,
  },
});
