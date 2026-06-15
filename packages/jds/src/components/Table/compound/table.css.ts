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

export const tableRow = style({
  background: vars.color.semantic.surface.standard,
});

globalStyle(`${tableRow}:last-of-type td`, {
  borderBottom: "none",
});

export const tableRowItem = recipe({
  base: {
    padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["12"]}`,
    verticalAlign: "top",

    borderBottom: `${vars.scheme.semantic.strokeWeight[1]} solid ${vars.color.semantic.stroke.subtle}`,

    selectors: {
      "&:last-child": {
        borderRight: "none",
      },
    },
  },
  variants: {
    hasDivider: {
      true: {
        borderRight: `${vars.scheme.semantic.strokeWeight[1]} solid ${vars.color.semantic.stroke.subtle}`,
      },
      false: {
        borderRight: "none",
      },
    },
  },
});

export const tableItemContent = recipe({
  base: {
    display: "flex",
  },
  variants: {
    variant: {
      label: {
        flexDirection: "column",
        gap: vars.scheme.semantic.spacing["4"],
      },
      code: {
        flexDirection: "column",
        gap: vars.scheme.semantic.spacing["4"],
      },
      badge: {
        flexDirection: "row",
        alignItems: "flex-start",
      },
    },
  },
});

export const tableItemTitle = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.scheme.semantic.spacing["6"],
});

export const descriptionStyle = style({
  selectors: {
    "&&": {
      color: vars.color.semantic.object.alternative,
    },
  },
});

export const codeWrapper = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: vars.scheme.semantic.spacing["4"],
});

export const badgeWrapper = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.scheme.semantic.spacing["6"],
});
