import { style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { textStyles } from "tokens";

import type {
  BodySize,
  BodyWeight,
  LabelSize,
  LabelWeight,
  SyntaxSize,
  TitleSize,
} from "./typography";

export const label = recipe({
  variants: {
    size: {
      lg: {},
      md: {},
      sm: {},
      xs: {},
    } satisfies Record<LabelSize, unknown>,
    weight: {
      bold: {},
      normal: {},
      subtle: {},
    } satisfies Record<LabelWeight, unknown>,
  },
  compoundVariants: [
    {
      variants: { size: "lg", weight: "bold" },
      style: textStyles.label.lg.bold,
    },
    {
      variants: { size: "lg", weight: "normal" },
      style: textStyles.label.lg.normal,
    },
    {
      variants: { size: "lg", weight: "subtle" },
      style: textStyles.label.lg.subtle,
    },
    {
      variants: { size: "md", weight: "bold" },
      style: textStyles.label.md.bold,
    },
    {
      variants: { size: "md", weight: "normal" },
      style: textStyles.label.md.normal,
    },
    {
      variants: { size: "md", weight: "subtle" },
      style: textStyles.label.md.subtle,
    },
    {
      variants: { size: "sm", weight: "bold" },
      style: textStyles.label.sm.bold,
    },
    {
      variants: { size: "sm", weight: "normal" },
      style: textStyles.label.sm.normal,
    },
    {
      variants: { size: "sm", weight: "subtle" },
      style: textStyles.label.sm.subtle,
    },
    {
      variants: { size: "xs", weight: "bold" },
      style: textStyles.label.xs.bold,
    },
    {
      variants: { size: "xs", weight: "normal" },
      style: textStyles.label.xs.normal,
    },
    {
      variants: { size: "xs", weight: "subtle" },
      style: textStyles.label.xs.subtle,
    },
  ],
  defaultVariants: {
    size: "md",
    weight: "normal",
  },
});

export const title = recipe({
  variants: {
    size: {
      "2xl": textStyles.title["6"],
      xl: textStyles.title["5"],
      lg: textStyles.title["4"],
      md: textStyles.title["3"],
      sm: textStyles.title["2"],
      xs: textStyles.title["1"],
    } satisfies Record<TitleSize, StyleRule>,
  },
  defaultVariants: {
    size: "md",
  },
});

export const body = recipe({
  variants: {
    size: {
      lg: {},
      md: {},
      sm: {},
      xs: {},
      "2xs": {},
    } satisfies Record<BodySize, unknown>,
    weight: {
      bold: {},
      normal: {},
    } satisfies Record<BodyWeight, unknown>,
  },
  compoundVariants: [
    {
      variants: { size: "lg", weight: "bold" },
      style: textStyles.body.lg.bold,
    },
    {
      variants: { size: "lg", weight: "normal" },
      style: textStyles.body.lg.normal,
    },
    {
      variants: { size: "md", weight: "bold" },
      style: textStyles.body.md.bold,
    },
    {
      variants: { size: "md", weight: "normal" },
      style: textStyles.body.md.normal,
    },
    {
      variants: { size: "sm", weight: "bold" },
      style: textStyles.body.sm.bold,
    },
    {
      variants: { size: "sm", weight: "normal" },
      style: textStyles.body.sm.normal,
    },
    {
      variants: { size: "xs", weight: "bold" },
      style: textStyles.body.xs.bold,
    },
    {
      variants: { size: "xs", weight: "normal" },
      style: textStyles.body.xs.normal,
    },
    {
      variants: { size: "2xs", weight: "bold" },
      style: textStyles.body["2xs"].bold,
    },
    {
      variants: { size: "2xs", weight: "normal" },
      style: textStyles.body["2xs"].normal,
    },
  ],
  defaultVariants: {
    size: "md",
    weight: "normal",
  },
});

export const syntax = recipe({
  variants: {
    size: {
      lg: textStyles.syntax.lg,
      md: textStyles.syntax.md,
      sm: textStyles.syntax.sm,
      xs: textStyles.syntax.xs,
    } satisfies Record<SyntaxSize, StyleRule>,
  },
  defaultVariants: {
    size: "md",
  },
});

export const inheritColor = style({
  color: "inherit",
});
