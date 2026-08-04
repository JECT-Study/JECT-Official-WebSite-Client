import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./dotBadge.css";
import type { DotBadgeProps } from "./dotBadge.types";

export const DotBadge = forwardRef<HTMLSpanElement, DotBadgeProps>(
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

DotBadge.displayName = "DotBadge";
