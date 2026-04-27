import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
import type { IconButtonProps } from "components";
import { useButtonInteractions } from "hooks";
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
    const { ref, buttonProps } = useButtonInteractions(forwardedRef, { isDisabled: disabled });

    return (
      <button
        ref={ref}
        {...mergeProps(buttonProps, restProps)}
        className={clsx(iconButton({ hierarchy, size, condensed }), className)}
      >
        <Icon name={icon} size={size} />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
