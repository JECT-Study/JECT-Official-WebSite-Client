import { ReactNode } from 'react';

import { NumericBadgeBasicDiv, NumericBadgeFeedbackDiv } from './NumericBadge.style';

import { BadgeSize, BasicHierarchy, FeedbackVariant, NumericBadgeStyle } from '@/components';
import { Label } from '@/components/Label';

export interface NumericBadgeBasicProps {
  hierarchy?: BasicHierarchy;
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

const NumericBadgeBasic = ({
  hierarchy = 'secondary',
  size = 'md',
  badgeStyle = 'solid',
  isMuted = false,
  children,
}: NumericBadgeBasicProps) => {
  return (
    <NumericBadgeBasicDiv
      hierarchy={hierarchy}
      size={size}
      badgeStyle={badgeStyle}
      isMuted={isMuted}
    >
      <Label as='span' size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </NumericBadgeBasicDiv>
  );
};

NumericBadgeBasic.displayName = 'NumericBadge.Basic';

export interface NumericBasicBadgeProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

const NumericBadgeFeedback = ({
  variant = 'positive',
  size = 'md',
  badgeStyle = 'solid',
  isMuted = false,
  children,
}: NumericBasicBadgeProps) => {
  return (
    <NumericBadgeFeedbackDiv
      variant={variant}
      size={size}
      badgeStyle={badgeStyle}
      isMuted={isMuted}
    >
      <Label as='span' size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </NumericBadgeFeedbackDiv>
  );
};

NumericBadgeFeedback.displayName = 'NumericBadge.Feedback';

export const NumericBadge = {
  Basic: NumericBadgeBasic,
  Feedback: NumericBadgeFeedback,
};
