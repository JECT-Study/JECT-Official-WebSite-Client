import type { Theme } from "@emotion/react";

import type { BasicHierarchy, CalloutStyleToken, FeedbackHierarchy } from "./Callout.types";
import type { LabelButtonBasicProps } from "../Button/LabelButton";

const basicStyles: Record<BasicHierarchy, (t: Theme) => CalloutStyleToken> = {
  primary: theme => ({
    bg: theme.color.semantic.fill.subtler,
    border: theme.color.semantic.stroke.alpha.assistive,
    color: theme.color.semantic.object.bold,
  }),
  secondary: theme => ({
    bg: theme.color.semantic.fill.subtlest,
    border: theme.color.semantic.stroke.alpha.subtle,
    color: theme.color.semantic.object.bold,
  }),
};

const feedbackStyles: Record<FeedbackHierarchy, (t: Theme) => CalloutStyleToken> = {
  positive: theme => ({
    bg: theme.color.semantic.feedback.positive.alpha.subtlest,
    border: theme.color.semantic.feedback.positive.alpha.subtler,
    color: theme.color.semantic.feedback.positive.normal,
  }),
  destructive: theme => ({
    bg: theme.color.semantic.feedback.destructive.alpha.subtlest,
    border: theme.color.semantic.feedback.destructive.alpha.subtler,
    color: theme.color.semantic.feedback.destructive.normal,
  }),
  notifying: theme => ({
    bg: theme.color.semantic.feedback.notifying.alpha.subtlest,
    border: theme.color.semantic.feedback.notifying.alpha.subtler,
    color: theme.color.semantic.feedback.notifying.normal,
  }),
};

export const getCalloutStyleToken = (
  theme: Theme,
  props: { hierarchy?: BasicHierarchy; feedback?: FeedbackHierarchy },
): CalloutStyleToken => {
  if (props.feedback) return feedbackStyles[props.feedback](theme);

  const hierarchy = props.hierarchy || "secondary";
  return basicStyles[hierarchy](theme);
};

export const calloutSizeMap = {
  lg: { paddingY: 16, paddingX: 20, gap: 16 },
  md: { paddingY: 16, paddingX: 20, gap: 16 },
  sm: { paddingY: 16, paddingX: 20, gap: 16 },
  xs: { paddingY: 12, paddingX: 16, gap: 12 },
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

type ButtonConfig = {
  hierarchy?: LabelButtonBasicProps["hierarchy"];
  intent?: "positive" | "destructive";
  variant: "basic" | "feedback";
};

export const getButtonConfig = (mode: {
  hierarchy?: BasicHierarchy;
  feedback?: FeedbackHierarchy;
}): ButtonConfig => {
  if (mode.feedback) {
    if (mode.feedback === "notifying") {
      return { variant: "basic", hierarchy: "primary" };
    }

    return { variant: "feedback", intent: mode.feedback };
  }

  return { variant: "basic", hierarchy: mode.hierarchy || "secondary" };
};
