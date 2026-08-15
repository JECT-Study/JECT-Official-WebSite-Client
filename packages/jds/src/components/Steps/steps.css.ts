import type { StyleRule } from "@vanilla-extract/css";
import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { pxToRem } from "utils";

import type { StepsSize } from "./steps.types";
import { vars } from "../../tokens/vars.css";
import { dividerColorVar } from "../Divider/divider.css";

import { labelColorVar } from "@/utils/typography.css";

const stepsHorizontalGap = {
  lg: vars.scheme.semantic.spacing["10"],
  md: vars.scheme.semantic.spacing["8"],
} satisfies Record<StepsSize, string>;

export const stepsLabel = recipe({
  base: {
    display: "block",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  variants: {
    activated: {
      true: { vars: { [labelColorVar]: vars.color.semantic.object.bold } },
      false: { vars: { [labelColorVar]: vars.color.semantic.object.alternative } },
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

const stepsGapVar = createVar();

export const stepsListItem = recipe({
  base: {
    display: "flex",
    minWidth: 0,
  },
  variants: {
    layout: {
      horizontal: {
        flexDirection: "row",
        alignItems: "center",
        gap: stepsGapVar,
      },
      vertical: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
  },
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
        gap: stepsGapVar,
      },
      vertical: {
        flexDirection: "column",
        alignItems: "stretch",
      },
    },
    size: {
      lg: { vars: { [stepsGapVar]: stepsHorizontalGap.lg } },
      md: { vars: { [stepsGapVar]: stepsHorizontalGap.md } },
    } satisfies Record<StepsSize, StyleRule>,
  },
});

export const stepsSeparatorIcon = style({
  color: vars.color.semantic.object.assistive,
  flexShrink: 0,
});

const activatedItemSelector = `[data-steps-activated='true']`;

export const stepsSeparatorLine = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    vars: { [dividerColorVar]: vars.color.semantic.stroke.alpha.subtle },
    selectors: {
      [`&:has(~ ${activatedItemSelector}, ~ * ${activatedItemSelector})`]: {
        vars: { [dividerColorVar]: vars.color.semantic.accent.neutral },
      },
    },
  },
  variants: {
    size: {
      lg: { width: pxToRem(20), height: pxToRem(20) },
      md: { width: pxToRem(18), height: pxToRem(18) },
    },
  },
});
