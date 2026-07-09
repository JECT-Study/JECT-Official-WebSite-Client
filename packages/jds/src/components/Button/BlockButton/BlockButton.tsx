import { clsx } from "clsx";
import type {
  BlockButtonBasicProps,
  BlockButtonFeedbackProps,
  BlockButtonProps,
} from "components";
import { Icon } from "components";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import { basicRoot, feedbackRoot, iconSizeMap } from "./blockButton.css";

const BlockButtonRoot = forwardRef<HTMLButtonElement, BlockButtonProps>(
  (
    {
      children,
      size = "md",
      hierarchy,
      variant,
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
      : basicRoot({ hierarchy: hierarchy ?? "primary", variant: variant ?? "solid", size });

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

BlockButtonRoot.displayName = "BlockButton";

const BlockButtonBasic = forwardRef<HTMLButtonElement, BlockButtonBasicProps>((props, ref) => (
  <BlockButtonRoot ref={ref} {...props} />
));

BlockButtonBasic.displayName = "BlockButton.Basic";

const BlockButtonFeedback = forwardRef<HTMLButtonElement, BlockButtonFeedbackProps>(
  ({ intent = "destructive", ...props }, ref) => (
    <BlockButtonRoot ref={ref} feedback={intent} {...props} />
  ),
);

BlockButtonFeedback.displayName = "BlockButton.Feedback";

export const BlockButton = Object.assign(BlockButtonRoot, {
  /** @deprecated `<BlockButton hierarchy variant>`를 사용하세요. */
  Basic: BlockButtonBasic,
  /** @deprecated `<BlockButton feedback>`를 사용하세요. */
  Feedback: BlockButtonFeedback,
});
