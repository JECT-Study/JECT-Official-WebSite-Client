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
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    return (
      <button
        ref={forwardedRef}
        type='button'
        {...restProps}
        disabled={disabled}
        data-disabled={disabled || undefined}
        data-part='root'
        className={clsx(styles.root({ hierarchy, size, condensed }), className)}
      >
        <Icon name={icon} size={size} className={styles.icon} />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
