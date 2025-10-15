import { Theme } from '@emotion/react';
import { BasicHierarchy, CalloutVariant, FeedbackHierarchy } from './Callout.types';

type BasicStyle = Record<
  CalloutVariant,
  Record<BasicHierarchy, { bg: string; border: string; color: string }>
>;

export const calloutBasicStylesMap = (theme: Theme): BasicStyle => ({
  hero: {
    accent: {
      bg: theme.color.semantic.accent.alpha.subtler,
      border: theme.color.semantic.accent.neutral,
      color: theme.color.semantic.accent.bold,
    },
    primary: {
      bg: theme.color.semantic.fill.subtler,
      border: theme.color.semantic.stroke.bold,
      color: theme.color.semantic.object.bolder,
    },
    secondary: {
      bg: theme.color.semantic.fill.subtlest,
      border: theme.color.semantic.stroke.neutral,
      color: theme.color.semantic.object.bold,
    },
  },
  hint: {
    accent: {
      bg: theme.color.semantic.accent.alpha.inverse.subtlest,
      border: theme.color.semantic.accent.alpha.subtle,
      color: theme.color.semantic.accent.normal,
    },
    primary: {
      bg: theme.color.semantic.surface.deep,
      border: theme.color.semantic.stroke.alpha.assistive,
      color: theme.color.semantic.object.bold,
    },
    secondary: {
      bg: theme.color.semantic.surface.deep,
      border: theme.color.semantic.stroke.alpha.subtler,
      color: theme.color.semantic.object.normal,
    },
  },
});

type FeedbackStyle = Record<
  CalloutVariant,
  Record<FeedbackHierarchy, { bg: string; border: string; color: string }>
>;

export const calloutFeedbackStylesMap = (theme: Theme): FeedbackStyle => ({
  hero: {
    positive: {
      bg: theme.color.semantic.feedback.positive.alpha.subtler,
      border: theme.color.semantic.feedback.positive.neutral,
      color: theme.color.semantic.feedback.positive.bold,
    },
    destructive: {
      bg: theme.color.semantic.feedback.destructive.alpha.subtler,
      border: theme.color.semantic.feedback.destructive.neutral,
      color: theme.color.semantic.feedback.destructive.bold,
    },
    notifying: {
      bg: theme.color.semantic.feedback.notifying.alpha.subtler,
      border: theme.color.semantic.feedback.notifying.neutral,
      color: theme.color.semantic.feedback.notifying.bold,
    },
  },
  hint: {
    positive: {
      bg: theme.color.semantic.feedback.positive.alpha.subtlest,
      border: theme.color.semantic.feedback.positive.alpha.subtler,
      color: theme.color.semantic.feedback.positive.normal,
    },
    destructive: {
      bg: theme.color.semantic.feedback.destructive.alpha.subtlest,
      border: theme.color.semantic.feedback.destructive.alpha.subtler,
      color: theme.color.semantic.feedback.destructive.normal,
    },
    notifying: {
      bg: theme.color.semantic.feedback.notifying.alpha.subtlest,
      border: theme.color.semantic.feedback.notifying.alpha.subtler,
      color: theme.color.semantic.feedback.notifying.normal,
    },
  },
});

export const calloutSizeMap = {
  lg: {
    paddingTopBottom: 16,
    paddingLeftRight: 24,
    gap: 16,
    title: 'title.2',
    content: 'body.lg.bold',
  },
  md: {
    paddingTopBottom: 16,
    paddingLeftRight: 24,
    gap: 16,
    title: 'title.1',
    content: 'body.md.bold',
  },
  sm: {
    paddingTopBottom: 16,
    paddingLeftRight: 24,
    gap: 16,
    title: 'label.lg.bold',
    content: 'body.sm.bold',
  },
  xs: {
    paddingTopBottom: 12,
    paddingLeftRight: 20,
    gap: 12,
    title: 'label.md.bold',
    content: 'body.xs.bold',
  },
  '2xs': {
    paddingTopBottom: 12,
    paddingLeftRight: 20,
    gap: 12,
    title: 'label.sm.bold',
    content: 'body.2xs.bold',
  },
} as const;
