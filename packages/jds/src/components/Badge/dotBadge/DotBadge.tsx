import { DotBadgeFeedbackProps } from "components";
import * as styles from "./dotBadge.css";

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
