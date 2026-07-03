import type { StyleRule } from "@vanilla-extract/css";
import { createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor, pxToRem } from "utils";

import type { MenuItemSize } from "./menuItem.types";

import { thumbnailVars } from "@/components/Thumbnail/thumbnail.css";
import { labelColorVar } from "@/utils/typography.css";

const menuItemVariants = {
  paddingHorizontal: createVar(),
  paddingVertical: createVar(),
  layerRadius: createVar(),
} as const;

export const menuContainerStyle = recipe({
  base: [
    overlay(),
    focusRing(),
    {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: vars.scheme.semantic.spacing["6"],
      width: "100%",
      cursor: "pointer",
      borderRadius: menuItemVariants.layerRadius,
      color: vars.color.semantic.object.bold,
      selectors: {
        "&:disabled, &[data-disabled]": {
          cursor: "default",
          color: vars.color.semantic.object.subtle,
          vars: { [labelColorVar]: vars.color.semantic.object.subtle },
        },
        "&::before, &::after": { inset: 0, borderRadius: menuItemVariants.layerRadius },
      },
      vars: {
        [overlayColor]: vars.color.semantic.object.assistive,
        [menuItemVariants.layerRadius]: vars.scheme.semantic.radius["8"],
      },
    },
  ],
  variants: {
    size: {
      sm: {
        vars: {
          [menuItemVariants.paddingHorizontal]: vars.scheme.semantic.spacing["8"],
          [menuItemVariants.paddingVertical]: vars.scheme.semantic.spacing["6"],
        },
      },
      md: {
        vars: {
          [menuItemVariants.paddingHorizontal]: vars.scheme.semantic.spacing["10"],
          [menuItemVariants.paddingVertical]: vars.scheme.semantic.spacing["6"],
        },
      },
      lg: {
        vars: {
          [menuItemVariants.paddingHorizontal]: vars.scheme.semantic.spacing["10"],
          [menuItemVariants.paddingVertical]: vars.scheme.semantic.spacing["4"],
        },
      },
    } satisfies Record<MenuItemSize, StyleRule>,
    isSelected: {
      true: {
        background: vars.color.semantic.fill.subtlest,
        vars: {
          [labelColorVar]: vars.color.semantic.object.boldest,
        },
      },
      false: {},
    },
    stretched: {
      true: {},
      false: {
        padding: `${menuItemVariants.paddingVertical} ${menuItemVariants.paddingHorizontal}`,
      },
    },
  },
});

export const menuItemLabel = recipe({
  base: {
    cursor: "inherit",
    vars: {
      [labelColorVar]: "inherit",
    },
  },
  variants: {
    fullWidthText: {
      true: {
        flex: 1,
      },
      false: {},
    },
  },
});

export const menuItemImage = recipe({
  variants: {
    size: {
      lg: {
        vars: { [thumbnailVars.width]: pxToRem(20) },
      },
      md: {
        vars: { [thumbnailVars.width]: pxToRem(18) },
      },
      sm: {
        vars: { [thumbnailVars.width]: pxToRem(16) },
      },
    } satisfies Record<MenuItemSize, StyleRule>,
  },
});
