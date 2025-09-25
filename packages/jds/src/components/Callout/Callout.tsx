import { ReactNode } from 'react';
import {
  BasicCalloutDiv,
  CalloutContentP,
  CalloutTitleP,
  FeedbackCalloutDiv,
} from './Callout.style';
import {
  BasicHierarchy,
  CalloutSize,
  CalloutType,
  CalloutVariant,
  FeedbackHierarchy,
} from './Callout.types';

interface CalloutProps {
  type: CalloutType;
  variant: CalloutVariant;
  hierarchy: BasicHierarchy | FeedbackHierarchy;
  size: CalloutSize;
  titleVisible: boolean;
  extraButtonVisible: boolean;
  title: string;
  children: ReactNode;
}

export const Callout = ({
  type = 'basic',
  hierarchy,
  variant = 'hero',
  size = 'md',
  titleVisible = false,
  extraButtonVisible = false,
  title,
  children,
}: CalloutProps) => {
  if (type === 'basic') {
    return (
      <BasicCalloutDiv hierarchy={hierarchy as BasicHierarchy} variant={variant} size={size}>
        {titleVisible && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
        <CalloutContentP size={size}>{children}</CalloutContentP>
      </BasicCalloutDiv>
    );
  } else if (type === 'feedback') {
    return (
      <FeedbackCalloutDiv hierarchy={hierarchy as FeedbackHierarchy} variant={variant} size={size}>
        {titleVisible && <CalloutTitleP size={size}>{title}</CalloutTitleP>}
        <CalloutContentP size={size}>{children}</CalloutContentP>
      </FeedbackCalloutDiv>
    );
  }
};

Callout.displayName = 'Callout';
