import { style } from "@vanilla-extract/css";

import { vars } from "../../../../tokens/vars.css";

export const root = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["16"],
  width: "100%",
  padding: vars.scheme.semantic.spacing["12"],
  borderTop: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
});

const group = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flex: "1 0 0",
  minWidth: 0,
  gap: vars.scheme.semantic.spacing["16"],
  paddingInline: vars.scheme.semantic.spacing["8"],
  paddingBottom: vars.scheme.semantic.spacing["2"],
} as const;

export const start = style(group);

export const end = style([group, { justifyContent: "flex-end" }]);
