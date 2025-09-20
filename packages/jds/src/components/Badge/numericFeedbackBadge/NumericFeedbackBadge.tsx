import { ReactNode } from 'react';
import { NumericFeedbackBadgeDiv } from './NumericFeedbackBadge.style';
import { BadgeSize, FeedbackVariant, NumericBadgeStyle } from '../badge.types';
import { Label } from '@/components/Label';

interface NumericBasicBadgeProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

export const NumericFeedbackBadge = ({
  variant = 'positive',
  size = 'md',
  badgeStyle = 'solid',
  isMuted = false,
  children,
}: NumericBasicBadgeProps) => {
  return (
    <NumericFeedbackBadgeDiv
      variant={variant}
      size={size}
      badgeStyle={badgeStyle}
      isMuted={isMuted}
    >
      <Label size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </NumericFeedbackBadgeDiv>
  );
};

NumericFeedbackBadge.displayName = 'NumericFeedbackBadge';
