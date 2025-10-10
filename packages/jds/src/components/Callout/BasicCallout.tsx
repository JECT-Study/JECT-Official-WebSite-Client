import { BasicCalloutDiv, CalloutContentP, CalloutTitleP } from './Callout.style';
import { BasicCalloutProps } from './Callout.types';

export const BasicCallout = ({
  variant = 'hero',
  hierarchy,
  size = 'md',
  titleVisible = false,
  extraButtonVisible = false,
  title,
  children,
}: BasicCalloutProps) => {
  return (
    <BasicCalloutDiv hierarchy={hierarchy} variant={variant} size={size}>
      {titleVisible && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
      <CalloutContentP size={size}>{children}</CalloutContentP>
    </BasicCalloutDiv>
  );
};
