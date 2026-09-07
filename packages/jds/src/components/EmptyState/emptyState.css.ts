import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import { thumbnailVars } from "@/components/Thumbnail/thumbnail.css";

const root = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    gap: vars.scheme.semantic.spacing["24"],
    paddingBlock: vars.scheme.semantic.margin.lg,
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
      vertical: {
        flexDirection: "column",
        paddingInline: vars.scheme.semantic.margin.sm,
      },
      horizontal: {
        paddingInline: vars.scheme.semantic.margin.md,
      },
    },
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
      },
    },
  },
});

const header = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    color: vars.color.semantic.object.neutral,
    cursor: "default",
  },
  variants: {
    layout: {
      vertical: { justifyContent: "center" },
      horizontal: { justifyContent: "flex-start" },
    },
  },
});

const thumbnail = style({
  flexShrink: 0,
  vars: {
    [thumbnailVars.width]: pxToRem(64),
  },
});

const body = recipe({
  base: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    margin: vars.scheme.semantic.spacing["0"],
    overflow: "hidden",
    color: vars.color.semantic.object.alternative,
    textOverflow: "ellipsis",
  },
  variants: {
    layout: {
      vertical: { textAlign: "center" },
      horizontal: { textAlign: "left" },
    },
  },
});

const buttonContainer = style({
  display: "flex",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["12"],
});

export const emptyStateStyles = {
  root,
  content,
  header,
  thumbnail,
  body,
  buttonContainer,
} as const;
