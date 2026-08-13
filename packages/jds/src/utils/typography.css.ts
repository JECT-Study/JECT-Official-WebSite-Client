import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import type {
  BodySize,
  BodyTextAlign,
  BodyWeight,
  LabelCursor,
  LabelSize,
  LabelTextAlign,
  LabelWeight,
  SyntaxSize,
  TitleSize,
} from "./typography";
import { vars } from "../tokens/vars.css";

const alignVariants: Record<LabelTextAlign, { justifyContent: string }> = {
  center: { justifyContent: "center" },
  left: { justifyContent: "flex-start" },
  right: { justifyContent: "flex-end" },
};

const bodyAlignVariants: Record<BodyTextAlign, { textAlign: "center" | "left" | "right" }> = {
  center: { textAlign: "center" },
  left: { textAlign: "left" },
  right: { textAlign: "right" },
};

export const labelColorVar = createVar();

export const label = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    color: fallbackVar(labelColorVar, vars.color.semantic.object.bold),
  },
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
    textAlign: alignVariants,
    cursor: {
      pointer: { cursor: "pointer" },
      default: { cursor: "default" },
    } satisfies Record<LabelCursor, unknown>,
  },
  compoundVariants: [
    {
      variants: { size: "lg", weight: "bold" },
      style: "semantic-textStyle-label-lg-bold",
    },
    {
      variants: { size: "lg", weight: "normal" },
      style: "semantic-textStyle-label-lg-normal",
    },
    {
      variants: { size: "lg", weight: "subtle" },
      style: "semantic-textStyle-label-lg-subtle",
    },
    {
      variants: { size: "md", weight: "bold" },
      style: "semantic-textStyle-label-md-bold",
    },
    {
      variants: { size: "md", weight: "normal" },
      style: "semantic-textStyle-label-md-normal",
    },
    {
      variants: { size: "md", weight: "subtle" },
      style: "semantic-textStyle-label-md-subtle",
    },
    {
      variants: { size: "sm", weight: "bold" },
      style: "semantic-textStyle-label-sm-bold",
    },
    {
      variants: { size: "sm", weight: "normal" },
      style: "semantic-textStyle-label-sm-normal",
    },
    {
      variants: { size: "sm", weight: "subtle" },
      style: "semantic-textStyle-label-sm-subtle",
    },
    {
      variants: { size: "xs", weight: "bold" },
      style: "semantic-textStyle-label-xs-bold",
    },
    {
      variants: { size: "xs", weight: "normal" },
      style: "semantic-textStyle-label-xs-normal",
    },
    {
      variants: { size: "xs", weight: "subtle" },
      style: "semantic-textStyle-label-xs-subtle",
    },
  ],
  defaultVariants: {
    size: "md",
    weight: "normal",
    textAlign: "left",
    cursor: "default",
  },
});

export const titleColorVar = createVar();

export const title = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    color: fallbackVar(titleColorVar, vars.color.semantic.object.bolder),
    cursor: "default",
  },
  variants: {
    size: {
      "2xl": "semantic-textStyle-title-6",
      xl: "semantic-textStyle-title-5",
      lg: "semantic-textStyle-title-4",
      md: "semantic-textStyle-title-3",
      sm: "semantic-textStyle-title-2",
      xs: "semantic-textStyle-title-1",
    } satisfies Record<TitleSize, string>,
    textAlign: alignVariants,
  },
  defaultVariants: {
    size: "md",
    textAlign: "left",
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
    textAlign: bodyAlignVariants,
  },
  compoundVariants: [
    {
      variants: { size: "lg", weight: "bold" },
      style: "semantic-textStyle-body-lg-bold",
    },
    {
      variants: { size: "lg", weight: "normal" },
      style: "semantic-textStyle-body-lg-normal",
    },
    {
      variants: { size: "md", weight: "bold" },
      style: "semantic-textStyle-body-md-bold",
    },
    {
      variants: { size: "md", weight: "normal" },
      style: "semantic-textStyle-body-md-normal",
    },
    {
      variants: { size: "sm", weight: "bold" },
      style: "semantic-textStyle-body-sm-bold",
    },
    {
      variants: { size: "sm", weight: "normal" },
      style: "semantic-textStyle-body-sm-normal",
    },
    {
      variants: { size: "xs", weight: "bold" },
      style: "semantic-textStyle-body-xs-bold",
    },
    {
      variants: { size: "xs", weight: "normal" },
      style: "semantic-textStyle-body-xs-normal",
    },
    {
      variants: { size: "2xs", weight: "bold" },
      style: "semantic-textStyle-body-2xs-bold",
    },
    {
      variants: { size: "2xs", weight: "normal" },
      style: "semantic-textStyle-body-2xs-normal",
    },
  ],
  defaultVariants: {
    size: "md",
    weight: "normal",
    textAlign: "left",
  },
});

export const syntax = recipe({
  variants: {
    size: {
      lg: "semantic-textStyle-syntax-lg",
      md: "semantic-textStyle-syntax-md",
      sm: "semantic-textStyle-syntax-sm",
      xs: "semantic-textStyle-syntax-xs",
    } satisfies Record<SyntaxSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

export const inheritColor = style({
  color: "inherit",
});
