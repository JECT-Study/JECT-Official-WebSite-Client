import { clsx } from "clsx";

import type { NumericBadgeBasicProps, NumericBasicBadgeProps } from "components";
import * as styles from "./numericBadge.css";

const NumericBadgeBasic = ({
  hierarchy = "secondary",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  children,
}: NumericBadgeBasicProps) => {
  return (
    <div className={styles.basicRoot({ hierarchy, size, badgeStyle, isMuted })}>
      <span className={clsx(styles.label, styles.labelTextStyle[size])}>{children}</span>
    </div>
  );
};

NumericBadgeBasic.displayName = "NumericBadge.Basic";

const NumericBadgeFeedback = ({
  variant = "positive",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  children,
}: NumericBasicBadgeProps) => {
  return (
    <div className={styles.feedbackRoot({ variant, size, badgeStyle, isMuted })}>
      <span className={clsx(styles.label, styles.labelTextStyle[size])}>{children}</span>
    </div>
  );
};

NumericBadgeFeedback.displayName = "NumericBadge.Feedback";

export const NumericBadge = {
  Basic: NumericBadgeBasic,
  Feedback: NumericBadgeFeedback,
};
