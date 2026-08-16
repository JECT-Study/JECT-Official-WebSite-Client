import type { StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import type { KbdSize, KbdType } from "./kbd.types";

import { labelColorVar } from "@/utils/typography.css";

const sizeVariants = {
  lg: { height: pxToRem(26), minWidth: pxToRem(20) },
  md: { height: pxToRem(24), minWidth: pxToRem(19) },
  sm: { height: pxToRem(22), minWidth: pxToRem(19) },
} satisfies Record<KbdSize, StyleRule>;

const typeVariants = {
  function: { paddingInline: vars.scheme.semantic.spacing["4"] },
  key: { paddingInline: vars.scheme.semantic.spacing["6"] },
  text: { paddingInline: vars.scheme.semantic.spacing["6"] },
} satisfies Record<KbdType, StyleRule>;

export const kbd = recipe({
  base: {
    alignItems: "center",
    borderRadius: vars.scheme.semantic.radius["4"],
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
    color: vars.color.semantic.object.neutral,
    vars: {
      [labelColorVar]: vars.color.semantic.object.neutral,
    },
    selectors: {
      "&&": {
        display: "inline-flex",
        justifyContent: "center",
        cursor: "inherit",
      },
    },
  },
  variants: {
    type: typeVariants,
    size: sizeVariants,
    isMuted: {
      true: {
        borderColor: vars.color.semantic.stroke.alpha.subtler,
        color: vars.color.semantic.object.subtle,
        vars: {
          [labelColorVar]: vars.color.semantic.object.subtle,
        },
      },
      false: {},
    },
  },
});
