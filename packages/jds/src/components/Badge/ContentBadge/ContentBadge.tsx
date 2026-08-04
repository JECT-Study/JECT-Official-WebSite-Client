import { clsx } from "clsx";
import { forwardRef, useId } from "react";

import type { BadgeSize } from "../badge.types";
import * as styles from "./contentBadge.css";
import type { ContentBadgeProps } from "./contentBadge.types";
import { IconButton } from "../../Button/IconButton";
import type { IconButtonSize } from "../../Button/IconButton";

import { getLabelClassName } from "@/utils";

const iconSizeMap = {
  lg: "sm",
  md: "sm",
  sm: "xs",
  xs: "2xs",
} satisfies Record<BadgeSize, IconButtonSize>;

export const ContentBadge = forwardRef<HTMLSpanElement, ContentBadgeProps>(
  (
    {
      hierarchy = "secondary",
      feedback,
      variant,
      size = "md",
      badgeStyle = "solid",
      isMuted = false,
      withIconButton = false,
      onIconClick,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    const labelId = useId();
    const actionId = useId();

    const iconSize = iconSizeMap[size];
    const rootClassName = feedback
      ? styles.feedbackRoot({ feedback, size, badgeStyle, isMuted, withIconButton })
      : variant
        ? styles.themeRoot({ variant, size, badgeStyle, isMuted })
        : styles.basicRoot({ hierarchy, size, badgeStyle, isMuted, withIconButton });

    return (
      <span ref={ref} className={clsx(rootClassName, className)} {...restProps}>
        <span id={labelId} className={clsx(styles.label, getLabelClassName({ size }))}>
          {children}
        </span>

        {withIconButton && (
          <>
            <span id={actionId} hidden>
              배지 제거
            </span>
            <IconButton
              type='button'
              icon='close-line'
              aria-labelledby={`${labelId} ${actionId}`}
              size={iconSize}
              hierarchy='accent'
              className={styles.icon}
              disabled={isMuted}
              onClick={onIconClick}
            />
          </>
        )}
      </span>
    );
  },
);

ContentBadge.displayName = "ContentBadge";
