import { DotFeedbackBadgeDiv } from './DotFeedbackBadge.style';
import { BadgeSize, FeedbackVariant } from '../badge.types';

interface DotFeedbackBadgeProps {
  variant: FeedbackVariant;
  size?: BadgeSize;
  isMuted?: boolean;
}

export const DotFeedbackBadge = ({
  variant = 'positive',
  size = 'md',
  isMuted = false,
}: DotFeedbackBadgeProps) => {
  return <DotFeedbackBadgeDiv variant={variant} size={size} isMuted={isMuted} />;
};

DotFeedbackBadge.displayName = 'DotFeedbackBadge';
