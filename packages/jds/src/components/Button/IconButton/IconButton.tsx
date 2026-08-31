import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";
import type { IconButtonProps } from "components";
import { forwardRef } from "react";

import * as styles from "./iconButton.css";
import { Icon } from "../../Icon";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      size = "md",
      hierarchy = "primary",
      condensed = true,
      disabled = false,
      accentColor,
      className,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const accentStyle = accentColor
      ? assignInlineVars({
          [styles.iconButtonAccentColor]: accentColor.normal,
          [styles.iconButtonAccentDisabledColor]: accentColor.disabled ?? accentColor.normal,
        })
      : undefined;

    return (
      <button
        ref={forwardedRef}
        type='button'
        {...restProps}
        disabled={disabled}
        data-disabled={disabled || undefined}
        data-part='root'
        className={clsx(styles.root({ hierarchy, size, condensed }), className)}
        style={{ ...accentStyle, ...style }}
      >
        <Icon name={icon} size={size} className={styles.icon} />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
