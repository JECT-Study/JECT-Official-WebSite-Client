import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

export const navRoot = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    height: pxToRem(48),
  },
  variants: {
    nested: {
      false: {
        paddingTop: vars.scheme.semantic.spacing["6"],
        paddingBottom: vars.scheme.semantic.spacing["6"],
      },
      true: {
        paddingTop: vars.scheme.semantic.spacing["10"],
        paddingBottom: vars.scheme.semantic.spacing["10"],
      },
    },
    floated: {
      true: {
        backgroundColor: vars.color.semantic.curtain.standard,
        borderBottom: `1px solid ${vars.color.semantic.stroke.subtler}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      },
      false: {},
    },
    stretched: {
      true: {},
      false: {
        paddingLeft: vars.scheme.semantic.margin.lg,
        paddingRight: vars.scheme.semantic.margin.lg,
      },
    },
  },
});

export const backButtonSlot = style({
  display: "flex",
  alignItems: "center",
  marginRight: vars.scheme.semantic.spacing["16"],
});

export const navTitle = style({
  flex: 1,
  minWidth: 0,
  margin: 0,
  lineHeight: 1,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  selectors: {
    "&&": { display: "block" },
  },
});

export const suffixActionSlot = style({
  display: "flex",
  alignItems: "center",
  marginLeft: vars.scheme.semantic.spacing["24"],
});
