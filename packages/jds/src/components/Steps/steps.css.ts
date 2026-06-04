import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

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
    size: {
      lg: ["semantic-textStyle-label-md-bold"],
      md: ["semantic-textStyle-label-sm-bold"],
    },
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

export const stepsRoot = recipe({
  base: {
    display: "flex",
    width: "100%",
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
      lg: { width: "20px", height: "20px" },
      md: { width: "18px", height: "18px" },
    },
  },
});
