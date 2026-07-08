import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import { titleColorVar } from "@/utils/typography.css";

const root = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    gap: vars.scheme.semantic.spacing["24"],
    padding: `${vars.scheme.semantic.margin.lg} ${vars.scheme.semantic.margin.sm}`,
    borderRadius: vars.scheme.semantic.radius["8"],
  },
  variants: {
    variant: {
      hollow: {},
      dashed: {
        border: `${vars.scheme.semantic.strokeWeight["1"]} dashed ${vars.color.semantic.stroke.alpha.assistive}`,
      },
      alpha: {
        backgroundColor: vars.color.semantic.fill.subtlest,
      },
    },
    layout: {
      vertical: { flexDirection: "column" },
      horizontal: { flexDirection: "row" },
    },
  },
  defaultVariants: {
    variant: "hollow",
    layout: "vertical",
  },
});

const content = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: vars.scheme.semantic.spacing["8"],
  },
  variants: {
    layout: {
      vertical: {},
      horizontal: {
        flex: 1,
        alignItems: "flex-start",
      },
    },
  },
  defaultVariants: {
    layout: "vertical",
  },
});

const header = style({
  vars: {
    [titleColorVar]: vars.color.semantic.object.neutral,
  },
});

const image = style({
  flexShrink: 0,
  width: pxToRem(64),
});

const body = recipe({
  base: [
    "semantic-textStyle-body-md-normal",
    {
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 3,
      margin: vars.scheme.semantic.spacing["0"],
      overflow: "hidden",
      color: vars.color.semantic.object.alternative,
      textOverflow: "ellipsis",
    },
  ],
  variants: {
    layout: {
      vertical: { textAlign: "center" },
      horizontal: { textAlign: "left" },
    },
  },
  defaultVariants: {
    layout: "vertical",
  },
});

const buttonContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: vars.scheme.semantic.spacing["12"],
  },
  variants: {
    hasBothActions: {
      true: { minWidth: pxToRem(130) },
      false: { minWidth: pxToRem(58) },
    },
  },
  defaultVariants: {
    hasBothActions: false,
  },
});

export const emptyStateStyles = {
  root,
  content,
  header,
  image,
  body,
  buttonContainer,
} as const;
