import type { Theme } from '@emotion/react';

import type { FeedbackVariant } from '../badge.types';

export const dotBadgeFeedbackStylesMap = (
  theme: Theme,
): Record<FeedbackVariant, { bg: string }> => ({
  positive: {
    bg: theme.color.semantic.feedback.positive.neutral,
  },
  destructive: {
    bg: theme.color.semantic.feedback.destructive.neutral,
  },
  notifying: {
    bg: theme.color.semantic.feedback.notifying.neutral,
  },
});

export const dotBadgeFeedbackMutedStylesMap = (
  theme: Theme,
): Record<FeedbackVariant, { bg: string }> => ({
  positive: {
    bg: theme.color.semantic.feedback.positive.alpha.subtle,
  },
  destructive: {
    bg: theme.color.semantic.feedback.destructive.alpha.subtle,
  },
  notifying: {
    bg: theme.color.semantic.feedback.notifying.alpha.subtle,
  },
});
