import type { Theme } from "@emotion/react";

import type { MenuItemSize } from "./menuItem.types";

export const menuItemColorMap = (
  theme: Theme,
  isDisabled: boolean,
  isSelected: boolean,
  isDestructive: boolean,
) => {
  if (isDisabled) return theme.color.semantic.object.subtle;
  if (isDestructive) return theme.color.semantic.feedback.destructive.normal;
  if (isSelected) return theme.color.semantic.accent.normal;

  return theme.color.semantic.object.bold;
};

export const menuItemImageSizeMap: Record<MenuItemSize, number> = {
  lg: 20,
  md: 18,
  sm: 16,
};
