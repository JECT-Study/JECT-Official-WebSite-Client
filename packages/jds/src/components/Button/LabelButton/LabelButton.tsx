import { clsx } from "clsx";
import type {
  LabelButtonBasicProps,
  LabelButtonFeedbackProps,
  LabelButtonProps,
} from "components";
import { Icon } from "components";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import { basicRoot, feedbackRoot, iconSizeMap } from "./labelButton.css";

const LabelButtonRoot = forwardRef<HTMLButtonElement, LabelButtonProps>(
  (
    {
      children,
      size = "md",
      hierarchy,
      feedback,
      prefixIcon,
      suffixIcon,
      disabled = false,
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const iconSize = iconSizeMap[size];
    const rootClassName = feedback
      ? feedbackRoot({ feedback, size })
      : basicRoot({ hierarchy: hierarchy ?? "primary", size });

    return (
      <button
        ref={forwardedRef}
        type='button'
        {...restProps}
        disabled={disabled}
        data-disabled={disabled || undefined}
        data-part='root'
        className={clsx(getLabelClassName({ size, weight: "bold" }), rootClassName, className)}
      >
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </button>
    );
  },
);

LabelButtonRoot.displayName = "LabelButton";

const LabelButtonBasic = forwardRef<HTMLButtonElement, LabelButtonBasicProps>((props, ref) => (
  <LabelButtonRoot ref={ref} {...props} />
));

LabelButtonBasic.displayName = "LabelButton.Basic";

const LabelButtonFeedback = forwardRef<HTMLButtonElement, LabelButtonFeedbackProps>(
  ({ intent = "destructive", ...props }, ref) => (
    <LabelButtonRoot ref={ref} feedback={intent} {...props} />
  ),
);

LabelButtonFeedback.displayName = "LabelButton.Feedback";

export const LabelButton = Object.assign(LabelButtonRoot, {
  /** @deprecated `<LabelButton hierarchy>`를 사용하세요. */
  Basic: LabelButtonBasic,
  /** @deprecated `<LabelButton feedback>`를 사용하세요. */
  Feedback: LabelButtonFeedback,
});
