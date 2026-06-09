import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./dotBadge.css";
import type { DotBadgeFeedbackProps } from "./dotBadge.types";
export type { DotBadgeFeedbackProps } from "./dotBadge.types";

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
