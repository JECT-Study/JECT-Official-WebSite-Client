import {
  CalloutBasicDiv,
  CalloutContentP,
  CalloutTitleP,
  CalloutFeedbackDiv,
} from './Callout.style';
import { BasicCalloutProps, FeedbackCalloutProps } from './Callout.types';

const CalloutBasic = ({
  variant = 'hero',
  hierarchy,
  size = 'md',
  titleVisible = false,
  extraButtonVisible = false,
  title,
  children,
}: BasicCalloutProps) => {
  return (
    <CalloutBasicDiv hierarchy={hierarchy} variant={variant} size={size}>
      {titleVisible && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
    </CalloutBasicDiv>
  );
};

CalloutBasic.displayName = 'Callout.Basic';

const CalloutFeedback = ({
  variant = 'hero',
  hierarchy,
  size = 'md',
  titleVisible = false,
  extraButtonVisible = false,
  title,
  children,
}: FeedbackCalloutProps) => {
  return (
    <CalloutFeedbackDiv hierarchy={hierarchy} variant={variant} size={size}>
      {titleVisible && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
    </CalloutFeedbackDiv>
  );
};

CalloutFeedback.displayName = 'Callout.Feedback';

export const Callout = {
  Basic: CalloutBasic,
  Feedback: CalloutFeedback,
};
