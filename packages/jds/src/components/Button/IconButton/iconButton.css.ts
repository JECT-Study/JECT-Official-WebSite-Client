import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../tokens/vars.css";
import { pxToRem } from "../../../utils/cssUnit";
import { focusRing } from "../../../utils/focusRing.css";
import { overlay, overlayColor } from "../../../utils/overlay.css";

const baseStyles = {
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  border: "none",
  borderRadius: 0,
  background: "transparent",
  cursor: "pointer",
  userSelect: "none",
  flexShrink: 0,
  selectors: {
    "&[data-disabled]": { cursor: "not-allowed" },
  },
} as const;

const sizeVariants = {
  "3xl": {
    width: pxToRem(32),
    height: pxToRem(32),
    selectors: {
      "&::before": { inset: pxToRem(-4), borderRadius: "4px" },
      "&::after": { inset: pxToRem(-4), borderRadius: "4px" },
    },
  },
  "2xl": {
    width: pxToRem(28),
    height: pxToRem(28),
    selectors: {
      "&::before": { inset: pxToRem(-4), borderRadius: "4px" },
      "&::after": { inset: pxToRem(-4), borderRadius: "4px" },
    },
  },
  xl: {
    width: pxToRem(24),
    height: pxToRem(24),
    selectors: {
      "&::before": { inset: pxToRem(-3), borderRadius: "4px" },
      "&::after": { inset: pxToRem(-3), borderRadius: "4px" },
    },
  },
  lg: {
    width: pxToRem(20),
    height: pxToRem(20),
    selectors: {
      "&::before": { inset: pxToRem(-3), borderRadius: "4px" },
      "&::after": { inset: pxToRem(-3), borderRadius: "4px" },
    },
  },
  md: {
    width: pxToRem(18),
    height: pxToRem(18),
    selectors: {
      "&::before": { inset: pxToRem(-2), borderRadius: "2px" },
      "&::after": { inset: pxToRem(-2), borderRadius: "2px" },
    },
  },
  sm: {
    width: pxToRem(16),
    height: pxToRem(16),
    selectors: {
      "&::before": { inset: pxToRem(-2), borderRadius: "2px" },
      "&::after": { inset: pxToRem(-2), borderRadius: "2px" },
    },
  },
  xs: {
    width: pxToRem(14),
    height: pxToRem(14),
    selectors: {
      "&::before": { inset: pxToRem(-1), borderRadius: "2px" },
      "&::after": { inset: pxToRem(-1), borderRadius: "2px" },
    },
  },
  "2xs": {
    width: pxToRem(12),
    height: pxToRem(12),
    selectors: {
      "&::before": { inset: pxToRem(-1), borderRadius: "2px" },
      "&::after": { inset: pxToRem(-1), borderRadius: "2px" },
    },
  },
} as const;

export const iconButton = recipe({
  base: [overlay, focusRing, baseStyles],
  variants: {
    hierarchy: {
      accent: {
        color: vars.color.semantic.accent.normal,
        vars: { [overlayColor]: vars.color.semantic.accent.normal },
        selectors: {
          "&[data-disabled]": { color: vars.color.semantic.accent.alpha.subtle },
        },
      },
      primary: {
        color: vars.color.semantic.object.boldest,
        vars: { [overlayColor]: vars.color.semantic.interaction.normal },
        selectors: {
          "&[data-disabled]": { color: vars.color.semantic.object.subtle },
        },
      },
      secondary: {
        color: vars.color.semantic.object.neutral,
        vars: { [overlayColor]: vars.color.semantic.interaction.normal },
        selectors: {
          "&[data-disabled]": { color: vars.color.semantic.object.subtle },
        },
      },
      tertiary: {
        color: vars.color.semantic.object.alternative,
        vars: { [overlayColor]: vars.color.semantic.interaction.normal },
        selectors: {
          "&[data-disabled]": { color: vars.color.semantic.object.subtle },
        },
      },
    },
    size: sizeVariants,
  },
  defaultVariants: {
    hierarchy: "primary",
    size: "md",
  },
});

export const iconButtonFeedback = recipe({
  base: [overlay, focusRing, baseStyles],
  variants: {
    intent: {
      positive: {
        color: vars.color.semantic.feedback.positive.normal,
        vars: { [overlayColor]: vars.color.semantic.feedback.positive.normal },
        selectors: {
          "&[data-disabled]": {
            color: vars.color.semantic.feedback.positive.alpha.subtle,
          },
        },
      },
      destructive: {
        color: vars.color.semantic.feedback.destructive.normal,
        vars: { [overlayColor]: vars.color.semantic.feedback.destructive.normal },
        selectors: {
          "&[data-disabled]": {
            color: vars.color.semantic.feedback.destructive.alpha.subtle,
          },
        },
      },
    },
    size: sizeVariants,
  },
  defaultVariants: {
    intent: "destructive",
    size: "md",
  },
});
