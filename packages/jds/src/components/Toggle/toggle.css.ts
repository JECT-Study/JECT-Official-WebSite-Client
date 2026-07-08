import { style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { overlay, overlayHoverOpacity, pxToRem, visuallyHidden } from "utils";

export const input = style([visuallyHidden]);

export const root = style([
  {
    display: "inline-flex",
    cursor: "pointer",
    selectors: {
      [`&:has(${input}:disabled)`]: {
        cursor: "not-allowed",
      },
    },
  },
]);

export const track = style([
  overlay({ density: "normal", hierarchy: "primary" }),
  {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: pxToRem(40),
    padding: vars.scheme.semantic.spacing["2"],
    borderRadius: vars.scheme.semantic.radius.max,
    backgroundColor: vars.color.semantic.fill.subtler,
    boxSizing: "border-box",
    cursor: "pointer",
    userSelect: "none",
    vars: {
      [overlayHoverOpacity]: "0",
    },
    transition: `background-color ${vars.environment.semantic.duration["150"]} ${vars.environment.semantic.motion.fluent}`,
    selectors: {
      "&::before": {
        content: '""',
        position: "absolute",
        pointerEvents: "none",
      },
      "&::before, &::after": {
        inset: 0,
        borderRadius: "inherit",
      },
      [`&:has(${input}:focus-visible)::before`]: {
        boxShadow: `0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${vars.color.semantic.accent.alpha.alternative}`,
        zIndex: 1,
      },
      [`&:has(${input}:checked)`]: {
        backgroundColor: vars.color.semantic.accent.neutral,
      },
      "&[data-disabled]": {
        backgroundColor: vars.color.semantic.fill.subtlest,
        cursor: "not-allowed",
      },
      [`&[data-disabled]:has(${input}:checked)`]: {
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
    [`${track}:has(${input}:checked) &`]: {
      transform: `translateX(${pxToRem(16)})`,
    },
  },
});
