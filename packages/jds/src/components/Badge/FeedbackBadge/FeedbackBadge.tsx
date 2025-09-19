import { ReactNode } from 'react';
import { FeedbackBadgeDiv } from './FeedbackBadge.style';
import { Label } from '../../Label';
import { BadgeSize, BadgeStyle, BadgeVariant } from '../Badge.types';

interface FeedbackBadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  type?: BadgeStyle;
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
