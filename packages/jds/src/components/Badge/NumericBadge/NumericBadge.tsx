import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./numericBadge.css";
import type { NumericBadgeProps } from "./numericBadge.types";

import { getLabelClassName } from "@/utils/typography";

export const NumericBadge = forwardRef<HTMLSpanElement, NumericBadgeProps>(
  (
    {
      hierarchy = "secondary",
      feedback,
      size = "md",
      badgeStyle = "solid",
      isMuted = false,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    const rootClassName = feedback
      ? styles.feedbackRoot({ feedback, size, badgeStyle, isMuted })
      : styles.basicRoot({ hierarchy, size, badgeStyle, isMuted });

    return (
      <span ref={ref} className={clsx(rootClassName, className)} {...restProps}>
        <span className={clsx(styles.label, getLabelClassName({ size, weight: "subtle" }))}>
          {children}
        </span>
      </span>
    );
  },
);

NumericBadge.displayName = "NumericBadge";
