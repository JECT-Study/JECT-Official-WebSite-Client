import { clsx } from "clsx";
import type { MouseEvent, ReactNode } from "react";

import * as styles from "./contentBadge.css";
import type {
  BadgeSize,
  ContentBadgeStyle,
  BasicHierarchy,
  ContentBadgeFeedbackVariant,
  ThemeVariant,
} from "../badge.types";
import { iconSizeMap } from "./contentBadge.variants";

import { Icon } from "@/components/Icon";

export interface ContentBadgeBasicProps {
  hierarchy?: BasicHierarchy;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  withIcon?: boolean;
  onIconClick?: (e: MouseEvent<Element>) => void;
  children: ReactNode;
}

const ContentBadgeBasic = ({
  hierarchy = "secondary",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  withIcon = false,
  onIconClick,
  children,
}: ContentBadgeBasicProps) => {
  const iconSize = iconSizeMap[size];

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

export interface ContentFeedbackBadgeProps {
  variant?: ContentBadgeFeedbackVariant;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

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

export interface ContentThemeBadgeProps {
  variant?: ThemeVariant;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

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
