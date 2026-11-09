import { style } from "@vanilla-extract/css";

import { vars } from "../../../../tokens/vars.css";

export const root = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  flexShrink: 0,
  width: "100%",
  padding: `${vars.scheme.semantic.spacing["12"]} ${vars.scheme.semantic.spacing["16"]}`,
  paddingBottom: `calc(${vars.scheme.semantic.spacing["12"]} + ${vars.scheme.semantic.spacing["2"]})`,
  borderTop: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
});
