import { clsx } from "clsx";
import { Slot } from "radix-ui";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import { basicRoot, feedbackRoot, iconSizeMap } from "./labelButton.css";
import type { LabelButtonProps } from "./labelButton.types";
import { Icon } from "../../Icon";

export const LabelButton = forwardRef<HTMLButtonElement, LabelButtonProps>(
  (
    {
      asChild = false,
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

LabelButton.displayName = "LabelButton";
