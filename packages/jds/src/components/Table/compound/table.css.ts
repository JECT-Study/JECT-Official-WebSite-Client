import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

export const tableHeader = style({
  background: vars.color.semantic.surface.deeper,
});

export const tableBody = style({
  background: vars.color.semantic.surface.standard,
});

export const tableHeaderItem = style({
  padding: vars.scheme.semantic.spacing["0"],
  verticalAlign: "middle",
  textAlign: "left",
  fontWeight: "normal",

  borderBottom: `${vars.scheme.semantic.strokeWeight[1]} solid ${vars.color.semantic.stroke.subtle}`,
  borderRight: `${vars.scheme.semantic.strokeWeight[1]} solid ${vars.color.semantic.stroke.subtle}`,

  selectors: {
    "&:last-child": {
      borderRight: "none",
    },
  },
});

export const tableHeaderLabel = style({
  width: "100%",
  minWidth: 0,
  height: "100%",
  padding: vars.scheme.semantic.spacing["12"],
  boxSizing: "border-box",

  wordBreak: "break-word",

  selectors: {
    "&&": {
      color: vars.color.semantic.object.bolder,
    },
  },
});

