import { clsx } from "clsx";
import type { NumericBadgeBasicProps, NumericBadgeFeedbackProps } from "components";
import { forwardRef } from "react";

import * as styles from "./numericBadge.css";

const NumericBadgeBasic = forwardRef<HTMLSpanElement, NumericBadgeBasicProps>(
  (
    {
      hierarchy = "secondary",
      size = "md",
      badgeStyle = "solid",
      isMuted = false,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.basicRoot({ hierarchy, size, badgeStyle, isMuted }), className)}
        {...restProps}
      >
        <span className={clsx(styles.label, styles.labelTextStyle[size])}>{children}</span>
      </span>
    );
  },
);

NumericBadgeBasic.displayName = "NumericBadge.Basic";

const NumericBadgeFeedback = forwardRef<HTMLSpanElement, NumericBadgeFeedbackProps>(
  (
    {
      variant = "positive",
      size = "md",
      badgeStyle = "solid",
      isMuted = false,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.feedbackRoot({ variant, size, badgeStyle, isMuted }), className)}
        {...restProps}
      >
        <span className={clsx(styles.label, styles.labelTextStyle[size])}>{children}</span>
      </span>
    );
  },
);

NumericBadgeFeedback.displayName = "NumericBadge.Feedback";

export const NumericBadge = {
  Basic: NumericBadgeBasic,
  Feedback: NumericBadgeFeedback,
};
