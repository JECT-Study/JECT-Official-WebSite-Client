import type { IconName } from "components";
import type { ComponentPropsWithoutRef } from "react";

export const ICON_BUTTON_SIZE_OPTIONS = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
] as const;
export const ICON_BUTTON_HIERARCHY_OPTIONS = [
  "accent",
  "primary",
  "secondary",
  "tertiary",
] as const;

export type IconButtonSize = (typeof ICON_BUTTON_SIZE_OPTIONS)[number];
export type IconButtonHierarchy = (typeof ICON_BUTTON_HIERARCHY_OPTIONS)[number];

// TODO(a11y): 이후 작업에서 aria-label / aria-labelledby 중 하나를 required로 강제
export type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  'data-part'?: never;
  icon: IconName;
  size?: IconButtonSize;
  hierarchy?: IconButtonHierarchy;
  condensed?: boolean;
};
