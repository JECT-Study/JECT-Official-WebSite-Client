import {
  CalloutBasicDiv,
  CalloutContentP,
  CalloutTitleP,
  CalloutFeedbackDiv,
  CalloutContentDiv,
} from "./Callout.style";
import type { BasicCalloutProps, FeedbackCalloutProps } from "./Callout.types";
import { calloutFeedbackButtonStyleMap, calloutLabelButtonStyleMap } from "./Callout.variants";

const CalloutBasic = ({
  hierarchy,
  size = "md",
  title,
  labelButtonProps,
  children,
  className,
}: BasicCalloutProps) => {
  const button = labelButtonProps && calloutLabelButtonStyleMap(size, labelButtonProps)[hierarchy];

  return (
    <CalloutBasicDiv hierarchy={hierarchy} size={size} className={className}>
      <CalloutContentDiv size={size}>
        {title && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
        <CalloutContentP size={size}>{children}</CalloutContentP>
      </CalloutContentDiv>
      {button}
    </CalloutBasicDiv>
  );
};

CalloutBasic.displayName = "Callout.Basic";

const CalloutFeedback = ({
  feedback,
  size = "md",
  title,
  labelButtonProps,
  children,
  className,
}: FeedbackCalloutProps) => {
  const button =
    labelButtonProps && calloutFeedbackButtonStyleMap(size, labelButtonProps)[feedback];

  return (
    <CalloutFeedbackDiv hierarchy={feedback} size={size} className={className}>
      <CalloutContentDiv size={size}>
        {title && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
        <CalloutContentP size={size}>{children}</CalloutContentP>
      </CalloutContentDiv>
      {button}
    </CalloutFeedbackDiv>
  );
};

CalloutFeedback.displayName = "Callout.Feedback";

export const Callout = {
  Basic: CalloutBasic,
  Feedback: CalloutFeedback,
};
