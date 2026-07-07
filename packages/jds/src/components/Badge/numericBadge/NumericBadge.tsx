import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./numericBadge.css";
import type {
  NumericBadgeBasicProps,
  NumericBadgeFeedbackProps,
  NumericBadgeProps,
} from "./numericBadge.types";

import { getLabelClassName } from "@/utils/typography";

const NumericBadgeRoot = forwardRef<HTMLSpanElement, NumericBadgeProps>(
  (
    {
      hierarchy = "accent",
      feedback,
      size = "md",
      badgeStyle = "alpha",
      isMuted = false,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    // TODO: feedbackRoot의 recipe variant key도 public prop 이름에 맞춰 feedback으로 변경
    const rootClassName = feedback
      ? styles.feedbackRoot({ variant: feedback, size, badgeStyle, isMuted })
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

NumericBadgeRoot.displayName = "NumericBadge";

const NumericBadgeBasic = forwardRef<HTMLSpanElement, NumericBadgeBasicProps>((props, ref) => (
  <NumericBadgeRoot ref={ref} {...props} />
));

NumericBadgeBasic.displayName = "NumericBadge.Basic";

const NumericBadgeFeedback = forwardRef<HTMLSpanElement, NumericBadgeFeedbackProps>(
  ({ variant = "positive", ...props }, ref) => (
    <NumericBadgeRoot ref={ref} feedback={variant} {...props} />
  ),
);

NumericBadgeFeedback.displayName = "NumericBadge.Feedback";

export const NumericBadge = Object.assign(NumericBadgeRoot, {
  /** @deprecated `<NumericBadge hierarchy badgeStyle>`를 사용하세요. */
  Basic: NumericBadgeBasic,
  /** @deprecated `<NumericBadge feedback badgeStyle>`를 사용하세요. */
  Feedback: NumericBadgeFeedback,
});
