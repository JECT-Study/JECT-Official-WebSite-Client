import { DotBadgeFeedbackDiv } from './DotBadge.style';
import type { BadgeSize, FeedbackVariant } from '../badge.types';

export interface DotBadgeFeedbackProps {
  variant: FeedbackVariant;
  size?: BadgeSize;
  isMuted?: boolean;
}

export const DotBadgeFeedback = ({
  variant = 'positive',
  size = 'md',
  isMuted = false,
}: DotBadgeFeedbackProps) => {
  return <DotBadgeFeedbackDiv variant={variant} size={size} isMuted={isMuted} />;
};

DotBadgeFeedback.displayName = 'DotBadge.Feedback';

export const DotBadge = {
  Feedback: DotBadgeFeedback,
};
