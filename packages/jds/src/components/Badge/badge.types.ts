export type BadgeStyle = {
  bg: string;
  color: string;
  border: string;
};

export type BadgeStyleWithoutBorder = Omit<BadgeStyle, "border">;

export type ContentBadgeStyle = "solid" | "alpha" | "outlined";
export type NumericBadgeStyle = "solid" | "hollow";
export type BadgeSize = "lg" | "md" | "sm" | "xs";
export type BasicHierarchy = "accent" | "primary" | "secondary" | "tertiary";
export type FeedbackVariant = "positive" | "destructive";

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
