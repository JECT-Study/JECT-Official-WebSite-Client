import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
import type { LabelButtonBasicProps, LabelButtonFeedbackProps } from "components";
import { Icon } from "components";
import { usePressable } from "hooks";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import { basicRoot, feedbackRoot, iconSizeMap } from "./labelButton.css";

const LabelButtonBasic = forwardRef<HTMLButtonElement, LabelButtonBasicProps>(
  (
    {
      children,
      size = "md",
      hierarchy = "primary",
      prefixIcon,
      suffixIcon,
      disabled = false,
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { ref, pressableProps } = usePressable(forwardedRef, { disabled });
    const iconSize = iconSizeMap[size];

    return (
      <button
        ref={ref}
        {...mergeProps(pressableProps, restProps)}
        data-part='root'
        className={clsx(
          getLabelClassName({ size, weight: "bold" }),
          basicRoot({ hierarchy, size }),
          className,
        )}
      >
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </button>
    );
  },
);

LabelButtonBasic.displayName = "LabelButton.Basic";

const LabelButtonFeedback = forwardRef<HTMLButtonElement, LabelButtonFeedbackProps>(
  (
    {
      children,
      size = "md",
      intent = "destructive",
      prefixIcon,
      suffixIcon,
      disabled = false,
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { ref, pressableProps } = usePressable(forwardedRef, { disabled });
    const iconSize = iconSizeMap[size];

    return (
      <button
        ref={ref}
        {...mergeProps(pressableProps, restProps)}
        data-part='root'
        className={clsx(
          getLabelClassName({ size, weight: "bold" }),
          feedbackRoot({ intent, size }),
          className,
        )}
      >
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </button>
    );
  },
);

LabelButtonFeedback.displayName = "LabelButton.Feedback";

export const LabelButton = {
  Basic: LabelButtonBasic,
  Feedback: LabelButtonFeedback,
};
