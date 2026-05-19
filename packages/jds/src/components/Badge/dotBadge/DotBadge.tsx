import * as styles from "./dotBadge.css";
import type { FeedbackVariant, BadgeSize } from "../badge.types";

export interface DotBadgeFeedbackProps {
  variant: FeedbackVariant;
  size?: BadgeSize;
  isMuted?: boolean;
}

export const DotBadgeFeedback = ({
  variant = "positive",
  size = "md",
  isMuted = false,
}: DotBadgeFeedbackProps) => {
  return <div className={styles.feedbackRoot({ variant, size, isMuted })} />;
};

DotBadgeFeedback.displayName = "DotBadge.Feedback";

export const DotBadge = {
  Feedback: DotBadgeFeedback,
};
