import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import type { IconButtonProps } from "components";
import { forwardRef } from "react";

import { iconButton } from "./iconButton.css";
import { Icon } from "../../Icon";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      size = "md",
      hierarchy = "primary",
      condensed = true,
      disabled = false,
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const ref = useObjectRef(forwardedRef);
    const { buttonProps, isPressed } = useButton({ isDisabled: disabled }, ref);
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const { focusProps, isFocusVisible } = useFocusRing();

    const classes = [iconButton({ hierarchy, size, condensed }), className]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        {...mergeProps(buttonProps, hoverProps, focusProps, restProps)}
        className={classes}
        data-hovered={isHovered || undefined}
        data-pressed={isPressed || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-disabled={disabled || undefined}
      >
        <Icon name={icon} size={size} />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
