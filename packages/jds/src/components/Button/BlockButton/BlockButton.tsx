import { clsx } from "clsx";
import type { BlockButtonProps } from "components";
import { Icon } from "components";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import { basicRoot, feedbackRoot, iconSizeMap } from "./blockButton.css";

export const BlockButton = forwardRef<HTMLButtonElement, BlockButtonProps>(
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

BlockButton.displayName = "BlockButton";
