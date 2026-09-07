import type { ComponentPropsWithoutRef } from "react";
import type { AriaLabelProps } from "types";

import type { IconName } from "../../Icon";

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

type IconButtonAccentProps =
  | { hierarchy?: Exclude<IconButtonHierarchy, "accent">; accentColor?: never }
  | { hierarchy: "accent"; accentColor?: { normal: string; disabled?: string } };

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-label" | "aria-labelledby"
> &
  AriaLabelProps &
  IconButtonAccentProps & {
    "data-part"?: never;
    icon: IconName;
    size?: IconButtonSize;
    condensed?: boolean;
  };
