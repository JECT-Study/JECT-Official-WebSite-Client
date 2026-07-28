import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./dotBadge.css";
import type { DotBadgeFeedbackProps, DotBadgeProps } from "./dotBadge.types";

const DotBadgeRoot = forwardRef<HTMLSpanElement, DotBadgeProps>(
  ({ feedback = "positive", size = "md", isMuted = false, className, ...restProps }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.feedbackRoot({ feedback, size, isMuted }), className)}
        {...restProps}
      />
    );
  },
);

DotBadgeRoot.displayName = "DotBadge";

const DotBadgeFeedback = forwardRef<HTMLSpanElement, DotBadgeFeedbackProps>(
  ({ variant = "positive", ...props }, ref) => (
    <DotBadgeRoot ref={ref} feedback={variant} {...props} />
  ),
);

DotBadgeFeedback.displayName = "DotBadge.Feedback";

export const DotBadge = Object.assign(DotBadgeRoot, {
  /** @deprecated `<DotBadge feedback>`를 사용하세요. */
  Feedback: DotBadgeFeedback,
});
