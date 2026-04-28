import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
import type { IconButtonProps } from "components";
import { useButtonInteractions } from "hooks";
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
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { ref, buttonProps } = useButtonInteractions(forwardedRef, { disabled });

    return (
      <button
        ref={ref}
        {...mergeProps(buttonProps, restProps)}
        data-part='root'
        style={style}
        className={clsx(styles.root({ hierarchy, size, condensed }), className)}
      >
        <Icon name={icon} size={size} className={styles.icon} />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
