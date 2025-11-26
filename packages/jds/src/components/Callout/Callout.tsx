import {
  CalloutBasicDiv,
  CalloutContentP,
  CalloutTitleP,
  CalloutFeedbackDiv,
} from "./Callout.style";
import type { BasicCalloutProps, FeedbackCalloutProps } from "./Callout.types";
import {
  calloutBasicButtonStyleMap,
  calloutButtonSizeMap,
  calloutFeedbackButtonStyleMap,
} from "./Callout.variants";

const CalloutBasic = ({
  variant = "hero",
  hierarchy,
  size = "md",
  title,
  blockButtonProps,
  children,
}: BasicCalloutProps) => {
  const buttonSize = calloutButtonSizeMap[size];
  const button =
    blockButtonProps && calloutBasicButtonStyleMap(buttonSize, blockButtonProps)[hierarchy];

  return (
    <CalloutBasicDiv hierarchy={hierarchy} variant={variant} size={size}>
      {title && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
      {button}
    </CalloutBasicDiv>
  );
};

CalloutBasic.displayName = "Callout.Basic";

const CalloutFeedback = ({
  variant = "hero",
  feedback,
  size = "md",
  title,
  blockButtonProps,
  children,
}: FeedbackCalloutProps) => {
  const buttonSize = calloutButtonSizeMap[size];
  const button =
    blockButtonProps && calloutFeedbackButtonStyleMap(buttonSize, blockButtonProps)[feedback];

  return (
    <CalloutFeedbackDiv hierarchy={feedback} variant={variant} size={size}>
      {title && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
      {button}
    </CalloutFeedbackDiv>
  );
};

CalloutFeedback.displayName = "Callout.Feedback";

export const Callout = {
  Basic: CalloutBasic,
  Feedback: CalloutFeedback,
};
