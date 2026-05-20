import type { BadgeSize, FeedbackVariant } from "../badge.types";

export interface DotBadgeFeedbackProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  isMuted?: boolean;
}
