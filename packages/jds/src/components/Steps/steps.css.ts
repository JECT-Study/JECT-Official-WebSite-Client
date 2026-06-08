import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { pxToRem } from "utils";

import { vars } from "../../tokens/vars.css";

export const stepsLabel = recipe({
  base: {
    display: "block",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "default",
  },
  variants: {
    activated: {
      true: { color: vars.color.semantic.object.bold },
      false: { color: vars.color.semantic.object.alternative },
    },
  },
});

export const stepsItem = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: vars.scheme.semantic.spacing["6"],
    minWidth: 0,
    cursor: "default",
  },
  variants: {
    layout: {
      horizontal: {
        flex: "0 1 auto",
      },
      vertical: {
        flex: "0 0 auto",
      },
    },
  },
});

export const stepsListItem = recipe({
  base: {
    display: "flex",
    listStyle: "none",
    minWidth: 0,
  },
  variants: {
    layout: {
      horizontal: {
        flexDirection: "row",
        alignItems: "center",
      },
      vertical: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    size: {
      lg: {},
      md: {},
    },
  },
  compoundVariants: [
    {
      variants: { layout: "horizontal", size: "lg" },
      style: { gap: vars.scheme.semantic.spacing["10"] },
    },
    {
      variants: { layout: "horizontal", size: "md" },
      style: { gap: vars.scheme.semantic.spacing["8"] },
    },
  ],
});

export const stepsRoot = recipe({
  base: {
    display: "flex",
    width: "100%",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  variants: {
    layout: {
      horizontal: {
        flexDirection: "row",
        alignItems: "center",
      },
      vertical: {
        flexDirection: "column",
        alignItems: "stretch",
      },
    },
    size: {
      lg: {},
      md: {},
    },
  },
  compoundVariants: [
    {
      variants: { layout: "horizontal", size: "lg" },
      style: { gap: vars.scheme.semantic.spacing["10"] },
    },
    {
      variants: { layout: "horizontal", size: "md" },
      style: { gap: vars.scheme.semantic.spacing["8"] },
    },
  ],
});

export const stepsSeparatorIcon = style({
  color: vars.color.semantic.object.assistive,
  flexShrink: 0,
});

export const stepsSeparatorLine = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  variants: {
    size: {
      lg: { width: pxToRem(20), height: pxToRem(20) },
      md: { width: pxToRem(18), height: pxToRem(18) },
    },
  },
});
