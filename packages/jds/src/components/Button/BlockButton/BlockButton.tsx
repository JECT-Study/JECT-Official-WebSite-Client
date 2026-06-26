import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
import type { BlockButtonBasicProps, BlockButtonFeedbackProps } from "components";
import { Icon } from "components";
import { usePressable } from "hooks";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import { basicRoot, feedbackRoot, iconSizeMap } from "./blockButton.css";

const BlockButtonBasic = forwardRef<HTMLButtonElement, BlockButtonBasicProps>(
  (
    {
      children,
      size = "md",
      variant = "solid",
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
          basicRoot({ hierarchy, variant, size }),
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

BlockButtonBasic.displayName = "BlockButton.Basic";

const BlockButtonFeedback = forwardRef<HTMLButtonElement, BlockButtonFeedbackProps>(
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

BlockButtonFeedback.displayName = "BlockButton.Feedback";

export const BlockButton = {
  Basic: BlockButtonBasic,
  Feedback: BlockButtonFeedback,
};
