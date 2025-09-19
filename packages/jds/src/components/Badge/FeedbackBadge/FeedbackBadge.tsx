import { ReactNode } from 'react';
import { FeedbackBadgeDiv } from './FeedbackBadge.style';
import { Label } from '../../Label';
import { BadgeSize, BadgeType, FeedbackVariant } from '../badge.types';

interface FeedbackBadgeProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  type?: BadgeType;
  isMuted?: boolean;
  children: ReactNode;
}

export const FeedbackBadge = ({
  variant = 'positive',
  size = 'md',
  type = 'solid',
  isMuted = false,
  children,
}: FeedbackBadgeProps) => {
  return (
    <FeedbackBadgeDiv variant={variant} size={size} type={type} isMuted={isMuted}>
      <Label size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </FeedbackBadgeDiv>
  );
};

FeedbackBadge.displayName = 'FeedbackBadge';
