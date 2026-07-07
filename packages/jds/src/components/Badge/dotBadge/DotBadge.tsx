import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./dotBadge.css";
import type { DotBadgeFeedbackProps, DotBadgeProps } from "./dotBadge.types";

const DotBadgeRoot = forwardRef<HTMLSpanElement, DotBadgeProps>(
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

DotBadgeRoot.displayName = "DotBadge";

const DotBadgeFeedback = forwardRef<HTMLSpanElement, DotBadgeFeedbackProps>((props, ref) => (
  <DotBadgeRoot ref={ref} {...props} />
));

DotBadgeFeedback.displayName = "DotBadge.Feedback";

export const DotBadge = Object.assign(DotBadgeRoot, {
  /** @deprecated `<DotBadge variant>`를 사용하세요. */
  Feedback: DotBadgeFeedback,
});
