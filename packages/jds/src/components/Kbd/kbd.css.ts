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
  function: { paddingInline: pxToRem(4) },
  key: { paddingInline: pxToRem(6) },
  text: { paddingInline: pxToRem(6) },
} satisfies Record<KbdType, StyleRule>;

export const kbd = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: vars.scheme.semantic.radius["4"],
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
    color: vars.color.semantic.object.neutral,
    vars: {
      [labelColorVar]: vars.color.semantic.object.neutral,
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
