import { clsx } from "clsx";
import { forwardRef } from "react";

import type { BadgeSize } from "../badge.types";
import * as styles from "./contentBadge.css";
import type {
  ContentBadgeBasicProps,
  ContentBadgeFeedbackProps,
  ContentBadgeThemeProps,
} from "./contentBadge.types";

import { Icon, type IconSize } from "@/components/Icon";
import { getLabelClassName } from "@/utils/typography";

const iconSizeMap = {
  lg: "sm",
  md: "sm",
  sm: "xs",
  xs: "2xs",
} satisfies Record<BadgeSize, IconSize>;

const ContentBadgeBasic = forwardRef<HTMLSpanElement, ContentBadgeBasicProps>(
  (
    {
      hierarchy = "secondary",
      size = "md",
      badgeStyle = "solid",
      isMuted = false,
      withIcon = false,
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
          styles.basicRoot({ hierarchy, size, badgeStyle, isMuted, withIcon }),
          className,
        )}
        {...restProps}
      >
        <span className={clsx(styles.label, getLabelClassName({ size }))}>{children}</span>
        {withIcon && (
          <Icon name='close-line' size={iconSize} className={styles.icon} onClick={onIconClick} />
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
      withIcon = false,
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
          styles.feedbackRoot({ variant, size, badgeStyle, isMuted, withIcon }),
          className,
        )}
        {...restProps}
      >
        <span className={clsx(styles.label, getLabelClassName({ size }))}>{children}</span>
        {withIcon && (
          <Icon name='close-line' size={iconSize} className={styles.icon} onClick={onIconClick} />
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
