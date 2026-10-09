import { style } from "@vanilla-extract/css";

import { vars } from "../../../../tokens/vars.css";

export const root = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["16"],
  width: "100%",
  padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["12"]}`,
});

export const titles = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flex: "1 0 0",
  minWidth: 0,
  gap: vars.scheme.semantic.spacing["16"],
  padding: `${vars.scheme.semantic.spacing["0"]} ${vars.scheme.semantic.spacing["8"]}`,
});

export const navigation = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexShrink: 0,
  gap: vars.scheme.semantic.spacing["8"],
});
