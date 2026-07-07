import { style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { focusRing, overlay, overlayHoverOpacity, pxToRem } from "utils";

export const root = style([
  overlay({ density: "normal", hierarchy: "primary" }),
  focusRing(),
  {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: pxToRem(40),
    padding: vars.scheme.semantic.spacing["2"],
    border: 0,
    borderRadius: vars.scheme.semantic.radius.max,
    backgroundColor: vars.color.semantic.fill.subtler,
    boxSizing: "border-box",
    cursor: "pointer",
    userSelect: "none",
    vars: {
      [overlayHoverOpacity]: "0",
    },
    selectors: {
      "&::before, &::after": {
        inset: 0,
        borderRadius: "inherit",
      },
      '&[aria-checked="true"]': {
        backgroundColor: vars.color.semantic.accent.neutral,
      },
      "&:disabled": {
        backgroundColor: vars.color.semantic.fill.subtlest,
        cursor: "not-allowed",
      },
      '&[aria-checked="true"]:disabled': {
        backgroundColor: vars.color.semantic.accent.alpha.subtler,
      },
    },
  },
]);

export const thumb = style({
  width: pxToRem(20),
  height: pxToRem(20),
  borderRadius: vars.scheme.semantic.radius.max,
  backgroundColor: vars.color.semantic.surface.static.standard,
  boxShadow: vars.environment.semantic.shadow.embossed,
  transform: "translateX(0)",
  transition: `transform ${vars.environment.semantic.duration["150"]} ${vars.environment.semantic.motion.fluent}`,
  selectors: {
    [`${root}[aria-checked="true"] &`]: {
      transform: `translateX(${pxToRem(16)})`,
    },
  },
});
