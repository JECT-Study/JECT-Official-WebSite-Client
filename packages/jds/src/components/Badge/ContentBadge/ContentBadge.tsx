import { clsx } from "clsx";
import { forwardRef } from "react";

import type { BadgeSize } from "../badge.types";
import * as styles from "./contentBadge.css";
import type {
  ContentBadgeBasicProps,
  ContentBadgeFeedbackProps,
  ContentBadgeProps,
  ContentBadgeThemeProps,
} from "./contentBadge.types";
import { IconButton } from "../../Button/IconButton";
import type { IconButtonSize } from "../../Button/IconButton";

import { getLabelClassName } from "@/utils";

const iconSizeMap = {
  lg: "sm",
  md: "sm",
  sm: "xs",
  xs: "2xs",
} satisfies Record<BadgeSize, IconButtonSize>;

const ContentBadgeRoot = forwardRef<HTMLSpanElement, ContentBadgeProps>(
  (
    {
      hierarchy = "accent",
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
    const iconSize = iconSizeMap[size];
    const rootClassName = feedback
      ? styles.feedbackRoot({ feedback, size, badgeStyle, isMuted, withIconButton })
      : variant
        ? styles.themeRoot({ variant, size, badgeStyle, isMuted })
        : styles.basicRoot({ hierarchy, size, badgeStyle, isMuted, withIconButton });

    return (
      <span ref={ref} className={clsx(rootClassName, className)} {...restProps}>
        <span className={clsx(styles.label, getLabelClassName({ size }))}>{children}</span>
        {withIconButton && (
          <IconButton
            type='button'
            icon='close-line'
            aria-label='Close badge'
            size={iconSize}
            hierarchy='accent'
            className={styles.icon}
            disabled={isMuted}
            onClick={onIconClick}
          />
        )}
      </span>
    );
  },
);

ContentBadgeRoot.displayName = "Badge.Content";

const ContentBadgeBasic = forwardRef<HTMLSpanElement, ContentBadgeBasicProps>((props, ref) => (
  <ContentBadgeRoot ref={ref} {...props} />
));

ContentBadgeBasic.displayName = "ContentBadge.Basic";

const ContentBadgeFeedback = forwardRef<HTMLSpanElement, ContentBadgeFeedbackProps>(
  ({ variant = "positive", ...props }, ref) => (
    <ContentBadgeRoot ref={ref} feedback={variant} {...props} />
  ),
);

ContentBadgeFeedback.displayName = "ContentBadge.Feedback";

const ContentBadgeTheme = forwardRef<HTMLSpanElement, ContentBadgeThemeProps>(
  ({ variant = "red", ...props }, ref) => (
    <ContentBadgeRoot ref={ref} variant={variant} {...props} />
  ),
);

ContentBadgeTheme.displayName = "ContentBadge.Theme";

export const ContentBadge = Object.assign(ContentBadgeRoot, {
  /** @deprecated `<Badge.Content hierarchy badgeStyle>`를 사용하세요. */
  Basic: ContentBadgeBasic,
  /** @deprecated `<Badge.Content feedback badgeStyle>`를 사용하세요. */
  Feedback: ContentBadgeFeedback,
  /** @deprecated `<Badge.Content variant badgeStyle>`를 사용하세요. */
  Theme: ContentBadgeTheme,
});
