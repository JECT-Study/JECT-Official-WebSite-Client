import { style } from "@vanilla-extract/css";

import { vars } from "../../tokens/vars.css";
import { dividerColorVar } from "../Divider/divider.css";

export const root = style({
  vars: {
    [dividerColorVar]: vars.color.semantic.stroke.alpha.subtle,
  },
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  backgroundColor: vars.color.semantic.surface.shallow,
  borderRadius: vars.scheme.semantic.radius["12"],
  outline: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
  boxShadow: vars.environment.semantic.shadow.floated,
  overflow: "clip",
});
