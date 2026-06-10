import { clsx } from "clsx";
import { forwardRef } from "react";

import type { BadgeSize } from "../badge.types";
import * as styles from "./contentBadge.css";
import type {
  ContentBadgeBasicProps,
  ContentBadgeFeedbackProps,
  ContentBadgeThemeProps,
} from "./contentBadge.types";

import { IconButton, type IconButtonSize } from "@/components";
import { getLabelClassName } from "@/utils";

const iconSizeMap = {
  lg: "sm",
  md: "sm",
  sm: "xs",
  xs: "2xs",
} satisfies Record<BadgeSize, IconButtonSize>;

const ContentBadgeBasic = forwardRef<HTMLSpanElement, ContentBadgeBasicProps>(
  (
    {
      hierarchy = "secondary",
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
    const iconSize = iconSizeMap[size];

    return (
      <span
        ref={ref}
        className={clsx(
          styles.basicRoot({ hierarchy, size, badgeStyle, isMuted, withIconButton }),
          className,
        )}
        {...restProps}
      >
        <span className={clsx(styles.label, getLabelClassName({ size }))}>{children}</span>
        {withIconButton && (
          <IconButton
            type='button'
            icon='close-line'
            size={iconSize}
            hierarchy='accent'
            className={styles.icon}
            aria-label='Close badge'
            onClick={onIconClick}
          />
        )}
      </span>
    );
  },
);

ContentBadgeBasic.displayName = "ContentBadge.Basic";

const ContentBadgeFeedback = forwardRef<HTMLSpanElement, ContentBadgeFeedbackProps>(
  (
    {
      variant = "positive",
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
    const iconSize = iconSizeMap[size];

    return (
      <span
        ref={ref}
        className={clsx(
          styles.feedbackRoot({ variant, size, badgeStyle, isMuted, withIconButton }),
          className,
        )}
        {...restProps}
      >
        <span className={clsx(styles.label, getLabelClassName({ size }))}>{children}</span>
        {withIconButton && (
          <IconButton
            type='button'
            icon='close-line'
            aria-label='Close badge'
            size={iconSize}
            hierarchy='accent'
            className={styles.icon}
            onClick={onIconClick}
          />
        )}
      </span>
    );
  },
);

ContentBadgeFeedback.displayName = "ContentBadge.Feedback";

const ContentBadgeTheme = forwardRef<HTMLSpanElement, ContentBadgeThemeProps>(
  (
    {
      variant = "red",
      size = "md",
      badgeStyle = "solid",
      isMuted = false,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.themeRoot({ variant, size, badgeStyle, isMuted }), className)}
        {...restProps}
      >
        <span className={clsx(styles.label, getLabelClassName({ size }))}>{children}</span>
      </span>
    );
  },
);

ContentBadgeTheme.displayName = "ContentBadge.Theme";

export const ContentBadge = {
  Basic: ContentBadgeBasic,
  Feedback: ContentBadgeFeedback,
  Theme: ContentBadgeTheme,
};
