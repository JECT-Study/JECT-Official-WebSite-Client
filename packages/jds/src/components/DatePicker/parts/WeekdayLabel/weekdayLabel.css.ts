import { style } from "@vanilla-extract/css";
import { pxToRem } from "utils";

import { vars } from "../../../../tokens/vars.css";

const WEEKDAY_LABEL_WIDTH = 16;

export const root = style({
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: `${vars.scheme.semantic.spacing["0"]} ${vars.scheme.semantic.spacing["8"]}`,
  color: vars.color.semantic.object.alternative,
});

export const label = style({
  width: pxToRem(WEEKDAY_LABEL_WIDTH),
  textAlign: "center",
});
