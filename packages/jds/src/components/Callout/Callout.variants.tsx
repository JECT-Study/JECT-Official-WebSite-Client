import type { Theme } from "@emotion/react";

import type { BasicHierarchy, CalloutSize, FeedbackHierarchy } from "./Callout.types";
import { LabelButton, type LabelButtonBasicProps } from "../Button/LabelButton";

type BasicStyle = Record<BasicHierarchy, { bg: string; border: string; color: string }>;

export const calloutBasicStylesMap = (theme: Theme): BasicStyle => ({
  primary: {
    bg: theme.color.semantic.fill.subtler,
    border: theme.color.semantic.stroke.alpha.assistive,
    color: theme.color.semantic.object.bold,
  },
  secondary: {
    bg: theme.color.semantic.fill.subtlest,
    border: theme.color.semantic.stroke.alpha.subtle,
    color: theme.color.semantic.object.bold,
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
  },
  md: {
    paddingTopBottom: 16,
    paddingLeftRight: 20,
    gap: 16,
  },
  sm: {
    paddingTopBottom: 16,
    paddingLeftRight: 20,
    gap: 16,
  },
  xs: {
    paddingTopBottom: 12,
    paddingLeftRight: 16,
    gap: 12,
  },
} as const;

export const calloutContentSizeMap = {
  lg: {
    gap: 10,
    title: "semantic-textStyle-title-1",
    content: "semantic-textStyle-body-lg-normal",
  },
  md: {
    gap: 10,
    title: "semantic-textStyle-label-lg-bold",
    content: "semantic-textStyle-body-md-normal",
  },
  sm: {
    gap: 6,
    title: "semantic-textStyle-label-md-bold",
    content: "semantic-textStyle-body-sm-normal",
  },
  xs: {
    gap: 6,
    title: "semantic-textStyle-label-sm-bold",
    content: "semantic-textStyle-body-2xs-normal",
  },
} as const;

export const calloutLabelButtonStyleMap = (
  size: CalloutSize,
  labelButtonProps: Omit<LabelButtonBasicProps, "size">,
) => ({
  primary: <LabelButton.Basic hierarchy='primary' size={size} {...labelButtonProps} />,
  secondary: <LabelButton.Basic hierarchy='secondary' size={size} {...labelButtonProps} />,
});

export const calloutFeedbackButtonStyleMap = (
  size: CalloutSize,
  labelButtonProps: Omit<LabelButtonBasicProps, "size">,
) => ({
  notifying: <LabelButton.Basic hierarchy='primary' size={size} {...labelButtonProps} />,
  positive: <LabelButton.Feedback intent='positive' size={size} {...labelButtonProps} />,
  destructive: <LabelButton.Feedback intent='destructive' size={size} {...labelButtonProps} />,
});
