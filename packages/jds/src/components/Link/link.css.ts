import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { overlay, focusRing } from "utils";

const baseStyle = style({
  position: "relative",
  display: "inline-flex",
  fontSize: "inherit",
  color: vars.color.semantic.accent.normal,
  gap: vars.scheme.semantic.spacing["2"],
  cursor: "pointer",
  textDecoration: "underline !important",
  selectors: {
    "&:disabled, &[data-disabled], [data-disabled] &": {
      color: vars.color.semantic.object.subtle,
      cursor: "not-allowed",
    },
    "&::before, &::after": { inset: 0, borderRadius: "inherit" },
  },
});

globalStyle(`${baseStyle} [data-part="icon"] svg`, {
  width: "0.875em",
  height: "0.875em",
});

export const root = style([
  overlay({ density: "bold", hierarchy: "accent", nativeHover: true }),
  focusRing(),
  baseStyle,
]);
