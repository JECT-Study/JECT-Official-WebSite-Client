import { CalloutContentP, CalloutTitleP, FeedbackCalloutDiv } from './Callout.style';
import { FeedbackCalloutProps } from './Callout.types';

export const FeedbackCallout = ({
  variant = 'hero',
  hierarchy,
  size = 'md',
  titleVisible = false,
  extraButtonVisible = false,
  title,
  children,
}: FeedbackCalloutProps) => {
  return (
    <FeedbackCalloutDiv hierarchy={hierarchy} variant={variant} size={size}>
      {titleVisible && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
    </FeedbackCalloutDiv>
  );
};
