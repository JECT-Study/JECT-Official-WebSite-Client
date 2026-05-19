export type BadgeStyle = {
  bg: string;
  color: string;
  border: string;
};

export type BadgeStyleWithoutBorder = Omit<BadgeStyle, "border">;

export type ContentBadgeStyle = "solid" | "alpha" | "outlined";
export type NumericBadgeStyle = "solid" | "empty"; // empty -> hollow
export type BadgeSize = "lg" | "md" | "sm" | "xs";
export type BasicHierarchy = "accent" | "primary" | "secondary" | "tertiary";
export type FeedbackVariant = "positive" | "destructive" | "notifying";
export type ContentBadgeFeedbackVariant = "positive" | "destructive";

export type ThemeVariant =
  | "red"
  | "orange"
  | "yellow"
  | "lime"
  | "green"
  | "teal"
  | "sky"
  | "indigo"
  | "purple"
  | "pink";
