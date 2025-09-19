import { ReactNode } from 'react';
import { ContentFeedbackBadgeDiv } from './ContentFeedbackBadge.style';
import { Label } from '../../Label';
import { BadgeSize, ContentBadgeStyle, FeedbackVariant } from '../badge.types';

interface ContentFeedbackBadgeProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

export const ContentFeedbackBadge = ({
  variant = 'positive',
  size = 'md',
  badgeStyle = 'solid',
  isMuted = false,
  children,
}: ContentFeedbackBadgeProps) => {
  return (
    <ContentFeedbackBadgeDiv
      variant={variant}
      size={size}
      badgeStyle={badgeStyle}
      isMuted={isMuted}
    >
      <Label size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </ContentFeedbackBadgeDiv>
  );
};

ContentFeedbackBadge.displayName = 'ContentFeedbackBadge';
