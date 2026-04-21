import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../tokens/vars.css";
import { pxToRem } from "../../../utils/cssUnit";
import { focusRing } from "../../../utils/focusRing.css";
import { overlay, overlayColor } from "../../../utils/overlay.css";

export const iconButton = recipe({
  base: [
    overlay,
    focusRing,
    {
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
    },
  ],
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
    size: {
      "3xl": {
        width: pxToRem(32),
        height: pxToRem(32),
        selectors: {
          "&::before": { inset: "-4px", borderRadius: pxToRem(4) },
          "&::after": { inset: "-4px", borderRadius: pxToRem(4) },
        },
      },
      "2xl": {
        width: pxToRem(28),
        height: pxToRem(28),
        selectors: {
          "&::before": { inset: "-4px", borderRadius: pxToRem(4) },
          "&::after": { inset: "-4px", borderRadius: pxToRem(4) },
        },
      },
      xl: {
        width: pxToRem(24),
        height: pxToRem(24),
        selectors: {
          "&::before": { inset: "-3px", borderRadius: pxToRem(4) },
          "&::after": { inset: "-3px", borderRadius: pxToRem(4) },
        },
      },
      lg: {
        width: pxToRem(20),
        height: pxToRem(20),
        selectors: {
          "&::before": { inset: "-3px", borderRadius: pxToRem(4) },
          "&::after": { inset: "-3px", borderRadius: pxToRem(4) },
        },
      },
      md: {
        width: pxToRem(18),
        height: pxToRem(18),
        selectors: {
          "&::before": { inset: "-2px", borderRadius: pxToRem(2) },
          "&::after": { inset: "-2px", borderRadius: pxToRem(2) },
        },
      },
      sm: {
        width: pxToRem(16),
        height: pxToRem(16),
        selectors: {
          "&::before": { inset: "-2px", borderRadius: pxToRem(2) },
          "&::after": { inset: "-2px", borderRadius: pxToRem(2) },
        },
      },
      xs: {
        width: pxToRem(14),
        height: pxToRem(14),
        selectors: {
          "&::before": { inset: "-1px", borderRadius: pxToRem(2) },
          "&::after": { inset: "-1px", borderRadius: pxToRem(2) },
        },
      },
      "2xs": {
        width: pxToRem(12),
        height: pxToRem(12),
        selectors: {
          "&::before": { inset: "-1px", borderRadius: pxToRem(2) },
          "&::after": { inset: "-1px", borderRadius: pxToRem(2) },
        },
      },
    },
  },
  defaultVariants: {
    hierarchy: "primary",
    size: "md",
  },
});
