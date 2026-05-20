import { clsx } from "clsx";
import type { DotBadgeFeedbackProps } from "components";
import { forwardRef } from "react";

import * as styles from "./dotBadge.css";

const DotBadgeFeedback = forwardRef<HTMLSpanElement, DotBadgeFeedbackProps>(
  ({ variant = "positive", size = "md", isMuted = false, className, ...restProps }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.feedbackRoot({ variant, size, isMuted }), className)}
        {...restProps}
      />
    );
  },
);

DotBadgeFeedback.displayName = "DotBadge.Feedback";

export const DotBadge = {
  Feedback: DotBadgeFeedback,
};
