import type { FeedbackVariant, BadgeSize } from "./dotBadge.types";

export {
  BADGE_SIZE_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
  type BadgeSize,
  type FeedbackVariant,
} from "../badge.types";

export interface DotBadgeFeedbackProps {
  variant: FeedbackVariant;
  size?: BadgeSize;
  isMuted?: boolean;
}
