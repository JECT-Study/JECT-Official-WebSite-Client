import type { ReactNode } from "react";

import type { BadgeSize, BasicHierarchy, FeedbackVariant, NumericBadgeStyle } from "../badge.types";
import {
  NumericBadgeBasicDiv,
  NumericBadgeBasicLabel,
  NumericBadgeFeedbackDiv,
  NumericBadgeFeedbackLabel,
} from "./NumericBadge.style";

export interface NumericBadgeBasicProps {
  hierarchy?: BasicHierarchy;
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

const NumericBadgeBasic = ({
  hierarchy = "secondary",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  children,
}: NumericBadgeBasicProps) => {
  return (
    <NumericBadgeBasicDiv
      hierarchy={hierarchy}
      size={size}
      badgeStyle={badgeStyle}
      isMuted={isMuted}
    >
      <NumericBadgeBasicLabel
        size={size}
        textAlign='center'
        weight='normal'
        hierarchy={hierarchy}
        badgeStyle={badgeStyle}
        isMuted={isMuted}
      >
        {children}
      </NumericBadgeBasicLabel>
    </NumericBadgeBasicDiv>
  );
};

NumericBadgeBasic.displayName = "NumericBadge.Basic";

export interface NumericBasicBadgeProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

const NumericBadgeFeedback = ({
  variant = "positive",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  children,
}: NumericBasicBadgeProps) => {
  return (
    <NumericBadgeFeedbackDiv
      variant={variant}
      size={size}
      badgeStyle={badgeStyle}
      isMuted={isMuted}
    >
      <NumericBadgeFeedbackLabel
        size={size}
        textAlign='center'
        weight='normal'
        variant={variant}
        badgeStyle={badgeStyle}
        isMuted={isMuted}
      >
        {children}
      </NumericBadgeFeedbackLabel>
    </NumericBadgeFeedbackDiv>
  );
};

NumericBadgeFeedback.displayName = "NumericBadge.Feedback";

export const NumericBadge = {
  Basic: NumericBadgeBasic,
  Feedback: NumericBadgeFeedback,
};
