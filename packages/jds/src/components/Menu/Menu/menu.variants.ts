import type { Theme } from "@emotion/react";

import type { MenuSize } from "./menu.types";

import type { LabelSize } from "@/components/Label/Label.style";

export const menuContentMap = (theme: Theme) => ({
  solid: {
    lg: {
      backgroundColor: theme.color.semantic.surface.shallow,
      border: `1px solid ${theme.color.semantic.stroke.subtler}`,
      padding: theme.scheme.semantic.margin.lg,
      borderRadius: theme.scheme.semantic.radius[10],
      gap: theme.scheme.semantic.spacing[20],
    },
    md: {
      backgroundColor: theme.color.semantic.surface.shallow,
      border: `1px solid ${theme.color.semantic.stroke.subtler}`,
      padding: theme.scheme.semantic.margin.md,
      borderRadius: theme.scheme.semantic.radius[10],
      gap: theme.scheme.semantic.spacing[20],
    },
    sm: {
      backgroundColor: theme.color.semantic.surface.shallow,
      border: `1px solid ${theme.color.semantic.stroke.subtler}`,
      padding: theme.scheme.semantic.margin.sm,
      borderRadius: theme.scheme.semantic.radius[10],
      gap: theme.scheme.semantic.spacing[16],
    },
  },
  empty: {
    lg: {
      backgroundColor: "none",
      border: "none",
      padding: 0,
      borderRadius: theme.scheme.semantic.radius[12],
      gap: theme.scheme.semantic.spacing[20],
    },
    md: {
      backgroundColor: "none",
      border: "none",
      padding: 0,
      borderRadius: theme.scheme.semantic.radius[12],
      gap: theme.scheme.semantic.spacing[20],
    },
    sm: {
      backgroundColor: "none",
      border: "none",
      padding: 0,
      borderRadius: theme.scheme.semantic.radius[12],
      gap: theme.scheme.semantic.spacing[20],
    },
  },
});

export const menuGroupSizeMap = (theme: Theme): Record<MenuSize, { gap: string }> => ({
  lg: {
    gap: theme.scheme.semantic.spacing[16],
  },
  md: {
    gap: theme.scheme.semantic.spacing[16],
  },
  sm: {
    gap: theme.scheme.semantic.spacing[12],
  },
});

export const menuCategorySizeMap: Record<MenuSize, LabelSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
};
