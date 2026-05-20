import { clsx } from "clsx";
import type {
  ContentBadgeBasicProps,
  ContentFeedbackBadgeProps,
  ContentThemeBadgeProps,
} from "components";

import * as styles from "./contentBadge.css";

import { Icon } from "@/components/Icon";

const ContentBadgeBasic = ({
  hierarchy = "secondary",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  withIcon = false,
  onIconClick,
  children,
}: ContentBadgeBasicProps) => {
  const iconSize = styles.iconSizeMap[size];

  return (
    <div className={styles.basicRoot({ hierarchy, size, badgeStyle, isMuted, withIcon })}>
      <span className={clsx(styles.label, styles.labelTextStyle[size])}>{children}</span>
      {withIcon && (
        <Icon name='close-line' size={iconSize} className={styles.icon} onClick={onIconClick} />
      )}
    </div>
  );
};

ContentBadgeBasic.displayName = "ContentBadge.Basic";

const ContentBadgeFeedback = ({
  variant = "positive",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  children,
}: ContentFeedbackBadgeProps) => {
  return (
    <div className={styles.feedbackRoot({ variant, size, badgeStyle, isMuted })}>
      <span className={clsx(styles.label, styles.labelTextStyle[size])}>{children}</span>
    </div>
  );
};

ContentBadgeFeedback.displayName = "ContentBadge.Feedback";

const ContentBadgeTheme = ({
  variant = "red",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  children,
}: ContentThemeBadgeProps) => {
  return (
    <div className={styles.themeRoot({ variant, size, badgeStyle, isMuted })}>
      <span className={clsx(styles.label, styles.labelTextStyle[size])}>{children}</span>
    </div>
  );
};

ContentBadgeTheme.displayName = "ContentBadge.Theme";

export const ContentBadge = {
  Basic: ContentBadgeBasic,
  Feedback: ContentBadgeFeedback,
  Theme: ContentBadgeTheme,
};
