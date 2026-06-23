import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor, pxToRem } from "utils";

import type { MenuItemSize } from "./menuItem.types";

import { thumbnailVars } from "@/components/Thumbnail/thumbnail.css";
import { labelColorVar } from "@/utils/typography.css";

const LAYER_RADIUS = vars.scheme.semantic.radius["8"];

const menuItemVariants = {
  paddingHorizontal: createVar(),
  paddingVertical: createVar(),
} as const;

export const menuContainerStyle = recipe({
  base: [
    overlay({ nativeHover: true }),
    focusRing(),
    {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: vars.scheme.semantic.spacing["6"],
      width: "100%",
      cursor: "pointer",
      borderRadius: LAYER_RADIUS,
      padding: `${menuItemVariants.paddingVertical} ${menuItemVariants.paddingHorizontal}`,
      color: vars.color.semantic.object.bold,
      selectors: {
        '&[aria-selected="true"]': {
          background: vars.color.semantic.fill.subtlest,
        },
        "&:disabled, &[data-disabled]": {
          cursor: "default",
          color: vars.color.semantic.object.subtle,
        },
        "&::before, &::after": { inset: 0, borderRadius: LAYER_RADIUS },
      },
      vars: { [overlayColor]: vars.color.semantic.object.assistive },
    },
  ],
  variants: {
    size: {
      sm: {
        vars: {
          [menuItemVariants.paddingHorizontal]: vars.scheme.semantic.spacing["10"],
          [menuItemVariants.paddingVertical]: vars.scheme.semantic.spacing["4"],
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
          [menuItemVariants.paddingHorizontal]: vars.scheme.semantic.spacing["8"],
          [menuItemVariants.paddingVertical]: vars.scheme.semantic.spacing["6"],
        },
      },
    } satisfies Record<MenuItemSize, unknown>,
    isSelected: {
      true: {
        vars: {
          [labelColorVar]: vars.color.semantic.object.boldest,
        },
      },
      false: {},
    },
  },
});

export const menuItemLabel = style({
  cursor: "inherit",
  vars: {
    [labelColorVar]: "inherit",
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
    } satisfies Record<MenuItemSize, unknown>,
  },
});
