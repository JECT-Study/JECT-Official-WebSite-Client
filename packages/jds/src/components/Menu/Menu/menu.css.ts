import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import type { MenuSize, MenuStyle } from "./menu.types";

import { labelColorVar } from "@/utils/typography.css";

const contentPaddingBySize = {
  lg: vars.scheme.semantic.margin.lg,
  md: vars.scheme.semantic.margin.md,
  sm: vars.scheme.semantic.margin.sm,
} satisfies Record<MenuSize, string>;

export const menuContent = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
  },
  variants: {
    menuStyle: {
      solid: {
        backgroundColor: vars.color.semantic.surface.shallow,
        border: `1px solid ${vars.color.semantic.stroke.subtler}`,
        borderRadius: vars.scheme.semantic.radius["10"],
        boxShadow: vars.environment.semantic.shadow.floated,
      },
      empty: {
        padding: 0,
        borderRadius: vars.scheme.semantic.radius["12"],
        gap: vars.scheme.semantic.spacing["20"],
      },
    } satisfies Record<MenuStyle, unknown>,
    size: {
      lg: {},
      md: {},
      sm: {},
    } satisfies Record<MenuSize, unknown>,
  },
  compoundVariants: [
    {
      variants: { menuStyle: "solid", size: "lg" },
      style: { padding: contentPaddingBySize.lg, gap: vars.scheme.semantic.spacing["20"] },
    },
    {
      variants: { menuStyle: "solid", size: "md" },
      style: { padding: contentPaddingBySize.md, gap: vars.scheme.semantic.spacing["20"] },
    },
    {
      variants: { menuStyle: "solid", size: "sm" },
      style: { padding: contentPaddingBySize.sm, gap: vars.scheme.semantic.spacing["16"] },
    },
  ],
});

export const menuCategory = style({
  vars: {
    [labelColorVar]: vars.color.semantic.object.alternative,
  },
});

export const menuGroup = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
  },
  variants: {
    size: {
      lg: { gap: vars.scheme.semantic.spacing["16"] },
      md: { gap: vars.scheme.semantic.spacing["16"] },
      sm: { gap: vars.scheme.semantic.spacing["12"] },
    } satisfies Record<MenuSize, unknown>,
  },
});
