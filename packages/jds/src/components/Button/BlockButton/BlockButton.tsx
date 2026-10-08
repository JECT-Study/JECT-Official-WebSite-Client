import { clsx } from "clsx";
import { Slot } from "radix-ui";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import { basicRoot, feedbackRoot, iconSizeMap } from "./blockButton.css";
import type { BlockButtonProps } from "./blockButton.types";
import { Icon } from "../../Icon";

export const BlockButton = forwardRef<HTMLButtonElement, BlockButtonProps>(
  (
    {
      asChild = false,
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

    const Component = asChild ? Slot.Root : "button";
    const nativeButtonProps = asChild ? {} : { type: "button" as const, disabled };

    return (
      <Component
        ref={forwardedRef}
        {...nativeButtonProps}
        {...restProps}
        data-disabled={disabled || undefined}
        data-part='root'
        className={clsx(getLabelClassName({ size, weight: "bold" }), rootClassName, className)}
      >
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        <Slot.Slottable>{children}</Slot.Slottable>
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </Component>
    );
  },
);

BlockButton.displayName = "BlockButton";
