import type { Theme } from "@emotion/react";

import type { BasicHierarchy, CalloutSize, FeedbackHierarchy } from "./Callout.types";
import type { BlockButtonSize } from "../Button/BlockButton";
import { BlockButton } from "../Button/BlockButton";
import type { BaseBlockButtonProps } from "../Button/BlockButton/blockButton.types";

export const calloutButtonSizeMap: Record<CalloutSize, BlockButtonSize> = {
  lg: "sm",
  md: "sm",
  sm: "sm",
  xs: "xs",
};

type BasicStyle = Record<BasicHierarchy, { bg: string; border: string; color: string }>;

export const calloutBasicStylesMap = (theme: Theme): BasicStyle => ({
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
});

type FeedbackStyle = Record<FeedbackHierarchy, { bg: string; border: string; color: string }>;

export const calloutFeedbackStylesMap = (theme: Theme): FeedbackStyle => ({
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
});

export const calloutSizeMap = {
  lg: {
    paddingTopBottom: 16,
    paddingLeftRight: 20,
    gap: 16,
    title: "semantic-textStyle-title-2",
    content: "semantic-textStyle-body-lg-bold",
  },
  md: {
    paddingTopBottom: 16,
    paddingLeftRight: 20,
    gap: 16,
    title: "semantic-textStyle-title-1",
    content: "semantic-textStyle-body-md-bold",
  },
  sm: {
    paddingTopBottom: 16,
    paddingLeftRight: 20,
    gap: 16,
    title: "semantic-textStyle-label-lg-bold",
    content: "semantic-textStyle-body-sm-bold",
  },
  xs: {
    paddingTopBottom: 12,
    paddingLeftRight: 16,
    gap: 12,
    title: "semantic-textStyle-label-md-bold",
    content: "semantic-textStyle-body-xs-bold",
  },
} as const;

export const calloutBasicButtonStyleMap = (
  buttonSize: BlockButtonSize,
  blockButtonProps: Omit<BaseBlockButtonProps, "size">,
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
  blockButtonProps: Omit<BaseBlockButtonProps, "size">,
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
