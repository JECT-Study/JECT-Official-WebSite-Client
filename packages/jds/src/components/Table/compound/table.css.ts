import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import { labelColorVar } from "@/utils/typography.css";

export const tableRoot = style({
  width: "100%",
  tableLayout: "fixed",
  borderSpacing: 0,
  overflow: "hidden",
  borderRadius: vars.scheme.semantic.radius["10"],
  border: `${vars.scheme.semantic.strokeWeight[1]} solid ${vars.color.semantic.stroke.subtle}`,
  background: vars.color.semantic.surface.standard,
});

export const tableHeader = style({
  background: vars.color.semantic.surface.deeper,
});

const cellBorder = `${vars.scheme.semantic.strokeWeight[1]} solid ${vars.color.semantic.stroke.subtle}`;

const cellBorderBase = {
  borderBottom: cellBorder,
  selectors: {
    "&:last-child": {
      borderRight: "none",
    },
  },
} as const;

const dividerVariants = {
  hasDivider: {
    true: {
      borderRight: cellBorder,
    },
    false: {
      borderRight: "none",
    },
  },
} as const;

export const tableHeaderItem = recipe({
  base: {
    padding: 0,
    verticalAlign: "middle",
    textAlign: "left",
    fontWeight: "normal",
    ...cellBorderBase,
  },
  variants: dividerVariants,
});

export const tableHeaderLabel = style({
  display: "block",
  width: "100%",
  minWidth: 0,
  height: "100%",
  padding: vars.scheme.semantic.spacing["12"],
  boxSizing: "border-box",
  wordBreak: "break-word",
  vars: {
    [labelColorVar]: vars.color.semantic.object.bolder,
  },
});

export const tableRow = style({});

export const tableRowItem = recipe({
  base: {
    padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["12"]}`,
    verticalAlign: "top",
    ...cellBorderBase,
    selectors: {
      ...cellBorderBase.selectors,
      [`${tableRow}:last-of-type > &`]: {
        borderBottom: "none",
      },
    },
  },
  variants: dividerVariants,
});

export const tableItemContent = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: vars.scheme.semantic.spacing["4"],
  },
  variants: {
    variant: {
      label: {},
      code: {},
      badge: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 0,
      },
    },
  },
});

export const tableItemTitle = style({
  display: "flex",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["6"],
});

export const descriptionStyle = style({
  vars: {
    [labelColorVar]: vars.color.semantic.object.alternative,
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
