import { styleVariants, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import type { KbdSize, KbdType } from "./kbd.types";
import { kbdPaddingXMap, kbdSizeMap, typographyMap } from "./kbd.variants";

const sizeVariants = styleVariants(kbdSizeMap, ({ height, minWidth }) => ({
  height: pxToRem(height),
  minWidth: pxToRem(minWidth),
}));

const typeVariants = styleVariants(kbdPaddingXMap, paddingX => ({
  paddingLeft: pxToRem(paddingX),
  paddingRight: pxToRem(paddingX),
}));

const typographyCompoundVariants = Object.entries(typographyMap).flatMap(([type, sizeMap]) =>
  Object.entries(sizeMap).map(([size, textStyle]) => ({
    variants: { type, size },
    style: textStyle,
  })),
) as Array<{
  variants: { type: KbdType; size: KbdSize };
  style: StyleRule;
}>;

export const kbd = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: vars.scheme.semantic.spacing["2"],
    paddingBottom: vars.scheme.semantic.spacing["2"],

    borderRadius: vars.scheme.semantic.radius["4"],
    border: `1px solid ${vars.color.semantic.stroke.alpha.subtle}`,
    color: vars.color.semantic.object.neutral,
  },
  variants: {
    type: typeVariants,
    size: sizeVariants,
    muted: {
      true: {
        borderColor: vars.color.semantic.stroke.alpha.subtler,
        color: vars.color.semantic.object.subtle,
      },
      false: {},
    },
  },
  compoundVariants: typographyCompoundVariants,
});
