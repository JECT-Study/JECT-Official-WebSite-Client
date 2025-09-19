import { ReactNode } from 'react';
import { ContentFeedbackBadgeDiv } from './ContentFeedbackBadge.style';
import { Label } from '../../Label';
import { BadgeSize, BadgeType, FeedbackVariant } from '../badge.types';

interface ContentFeedbackBadgeProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  type?: BadgeType;
  isMuted?: boolean;
  children: ReactNode;
}

export const ContentFeedbackBadge = ({
  variant = 'positive',
  size = 'md',
  type = 'solid',
  isMuted = false,
  children,
}: ContentFeedbackBadgeProps) => {
  return (
    <ContentFeedbackBadgeDiv variant={variant} size={size} type={type} isMuted={isMuted}>
      <Label size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </ContentFeedbackBadgeDiv>
  );
};

ContentFeedbackBadge.displayName = 'ContentFeedbackBadge';
