import { style } from "@vanilla-extract/css";
import { pxToRem } from "utils";

import { vars } from "../../tokens/vars.css";
import { dividerColorVar } from "../Divider/divider.css";

const TIME_PICKER_HEIGHT = 280;

export const root = style({
  vars: {
    [dividerColorVar]: vars.color.semantic.stroke.alpha.subtle,
  },
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
  height: pxToRem(TIME_PICKER_HEIGHT),
  backgroundColor: vars.color.semantic.surface.shallow,
  borderRadius: vars.scheme.semantic.radius["12"],
  outline: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
  boxShadow: vars.environment.semantic.shadow.floated,
  overflow: "clip",
});

export const columns = style({
  display: "flex",
  flex: "1 1 0",
  minHeight: 0,
  paddingInline: vars.scheme.semantic.spacing["4"],
});
