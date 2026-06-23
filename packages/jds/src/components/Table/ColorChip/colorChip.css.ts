import { createVar, style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { pxToRem } from "utils";

export const colorChipBackground = createVar();

export const colorChip = style({
  flexShrink: 0,
  width: pxToRem(16),
  height: pxToRem(16),
  backgroundColor: colorChipBackground,
  border: `${vars.scheme.semantic.strokeWeight[1]} solid ${vars.color.semantic.stroke.subtle}`,
});
