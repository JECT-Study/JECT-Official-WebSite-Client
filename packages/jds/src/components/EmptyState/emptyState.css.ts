import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import { thumbnailVars } from "@/components/Thumbnail/thumbnail.css";
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
      horizontal: {},
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

const header = style({
  vars: {
    [titleColorVar]: vars.color.semantic.object.neutral,
  },
});

const thumbnail = style({
  flexShrink: 0,
  height: pxToRem(64),
  vars: {
    [thumbnailVars.width]: pxToRem(64),
  },
});

const body = style({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  margin: vars.scheme.semantic.spacing["0"],
  overflow: "hidden",
  color: vars.color.semantic.object.alternative,
  textOverflow: "ellipsis",
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
});

export const emptyStateStyles = {
  root,
  content,
  header,
  thumbnail,
  body,
  buttonContainer,
} as const;
