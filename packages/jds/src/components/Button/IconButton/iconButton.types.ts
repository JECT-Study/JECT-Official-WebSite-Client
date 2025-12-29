import type { IconName } from "components";
import type { ComponentPropsWithoutRef } from "react";

export type IconButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type IconButtonHierarchy = "accent" | "primary" | "secondary" | "tertiary";
export type IconButtonIntent = "positive" | "destructive";

export interface BaseIconButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: IconName;
  size?: IconButtonSize;
  "aria-label"?: string;
}

export interface IconButtonBasicProps extends BaseIconButtonProps {
  hierarchy?: IconButtonHierarchy;
}

export interface IconButtonFeedbackProps extends BaseIconButtonProps {
  intent: IconButtonIntent;
}
