import { Theme } from '@emotion/react';
import { BasicHierarchy, CalloutVariant, FeedbackHierarchy } from './Callout.types';

type BasicStyle = Record<
  CalloutVariant,
  Record<BasicHierarchy, { bg: string; border: string; color: string }>
>;

export const CALLOUT_BASIC_STYLE = (theme: Theme): BasicStyle => ({
  hero: {
    accent: {
      bg: theme.color.accent.alpha.subtler,
      border: theme.color.accent.neutral,
      color: theme.color.accent.bold,
    },
    primary: {
      bg: theme.color.fill.subtler,
      border: theme.color.stroke.bold,
      color: theme.color.object.bolder,
    },
    secondary: {
      bg: theme.color.fill.subtlest,
      border: theme.color.stroke.neutral,
      color: theme.color.object.bold,
    },
  },
  hint: {
    accent: {
      bg: theme.color.accent.alpha.inverse.subtlest,
      border: theme.color.accent.alpha.subtle,
      color: theme.color.accent.normal,
    },
    primary: {
      bg: theme.color.surface.deep,
      border: theme.color.stroke.alpha.assistive,
      color: theme.color.object.bold,
    },
    secondary: {
      bg: theme.color.surface.deep,
      border: theme.color.stroke.alpha.subtler,
      color: theme.color.object.normal,
    },
  },
});

type FeedbackStyle = Record<
  CalloutVariant,
  Record<FeedbackHierarchy, { bg: string; border: string; color: string }>
>;

export const CALLOUT_FEEDBACK_STYLE = (theme: Theme): FeedbackStyle => ({
  hero: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtler,
      border: theme.color.feedback.positive.neutral,
      color: theme.color.feedback.positive.bold,
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtler,
      border: theme.color.feedback.destructive.neutral,
      color: theme.color.feedback.destructive.bold,
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtler,
      border: theme.color.feedback.notifying.neutral,
      color: theme.color.feedback.notifying.bold,
    },
  },
  hint: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtlest,
      border: theme.color.feedback.positive.alpha.subtler,
      color: theme.color.feedback.positive.normal,
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtlest,
      border: theme.color.feedback.destructive.alpha.subtler,
      color: theme.color.feedback.destructive.normal,
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtlest,
      border: theme.color.feedback.notifying.alpha.subtler,
      color: theme.color.feedback.notifying.normal,
    },
  },
});

export const CALLOUT_SIZE = {
  lg: { padding: '16px 24px', gap: '16px', title: 'title.2', content: 'body.lg.bold' },
  md: { padding: '16px 24px', gap: '16px', title: 'title.1', content: 'body.md.bold' },
  sm: { padding: '16px 24px', gap: '16px', title: 'label.lg.bold', content: 'body.sm.bold' },
  xs: { padding: '12px 20px', gap: '12px', title: 'label.md.bold', content: 'body.xs.bold' },
  '2xs': { padding: '12px 20px', gap: '12px', title: 'label.sm.bold', content: 'body.2xs.bold' },
} as const;
