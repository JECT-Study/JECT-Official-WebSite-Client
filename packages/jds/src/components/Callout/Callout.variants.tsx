import { Theme } from '@emotion/react';
import { BasicHierarchy, CalloutSize, CalloutVariant, FeedbackHierarchy } from './Callout.types';
import { BlockButton, BlockButtonSize } from '../Button/BlockButton';
import { BaseBlockButtonProps } from '../Button/BlockButton/blockButton.types';

export const calloutButtonSizeMap: Record<CalloutSize, BlockButtonSize> = {
  lg: 'sm',
  md: 'sm',
  sm: 'sm',
  xs: 'xs',
  '2xs': 'xs',
};

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
    title: 'semantic-textStyle-title-2',
    content: 'semantic-textStyle-body-lg-bold',
  },
  md: {
    paddingTopBottom: 16,
    paddingLeftRight: 24,
    gap: 16,
    title: 'semantic-textStyle-title-1',
    content: 'semantic-textStyle-body-md-bold',
  },
  sm: {
    paddingTopBottom: 16,
    paddingLeftRight: 24,
    gap: 16,
    title: 'semantic-textStyle-label-lg-bold',
    content: 'semantic-textStyle-body-sm-bold',
  },
  xs: {
    paddingTopBottom: 12,
    paddingLeftRight: 20,
    gap: 12,
    title: 'semantic-textStyle-label-md-bold',
    content: 'semantic-textStyle-body-xs-bold',
  },
  '2xs': {
    paddingTopBottom: 12,
    paddingLeftRight: 20,
    gap: 12,
    title: 'semantic-textStyle-label-sm-bold',
    content: 'semantic-textStyle-body-2xs-bold',
  },
} as const;

export const calloutBasicButtonStyleMap = (
  buttonSize: BlockButtonSize,
  blockButtonProps: Omit<BaseBlockButtonProps, 'size'>,
) => ({
  accent: (
    <BlockButton.Basic hierarchy='accent' size={buttonSize} variant='solid' {...blockButtonProps} />
  ),
  primary: (
    <BlockButton.Basic
      hierarchy='primary'
      size={buttonSize}
      variant='solid'
      {...blockButtonProps}
    />
  ),
  secondary: (
    <BlockButton.Basic
      hierarchy='secondary'
      size={buttonSize}
      variant='solid'
      {...blockButtonProps}
    />
  ),
});

export const calloutFeedbackButtonStyleMap = (
  buttonSize: BlockButtonSize,
  blockButtonProps: Omit<BaseBlockButtonProps, 'size'>,
) => ({
  notifying: (
    <BlockButton.Basic
      hierarchy='primary'
      size={buttonSize}
      variant='solid'
      {...blockButtonProps}
    />
  ),
  positive: <BlockButton.Feedback intent='positive' size={buttonSize} {...blockButtonProps} />,
  destructive: (
    <BlockButton.Feedback intent='destructive' size={buttonSize} {...blockButtonProps} />
  ),
});
