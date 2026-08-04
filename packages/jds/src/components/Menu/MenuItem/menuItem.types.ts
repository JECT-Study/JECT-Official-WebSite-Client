import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { IconName } from "../../Icon";

import type { NumericBadgeProps } from "@/components/Badge";

export type MenuItemVariant = "icon" | "thumbnail";
export type MenuItemSize = "lg" | "md" | "sm";

export interface MenuItemButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: MenuItemVariant;
  size?: MenuItemSize;
  isSelected?: boolean;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
  prefixIconVisible?: boolean;
  suffixIconVisible?: boolean;
  children: ReactNode;
  imageAlt?: string;
  imageSrc?: string;
  stretched?: boolean;
  fullWidthText?: boolean;
}

export interface MenuItemAnchorProps extends ComponentPropsWithoutRef<"a"> {
  variant?: MenuItemVariant;
  size?: MenuItemSize;
  disabled?: boolean;
  isSelected?: boolean;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
  prefixIconVisible?: boolean;
  suffixIconVisible?: boolean;
  suffixBadge?: NumericBadgeProps["children"];
  suffixBadgeVisible?: boolean;
  suffixBadgeMuted?: boolean;
  children: ReactNode;
  imageAlt?: string;
  imageSrc?: string;
  stretched?: boolean;
  fullWidthText?: boolean;
}
