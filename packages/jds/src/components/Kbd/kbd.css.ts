import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import type { KbdSize, KbdType } from "./kbd.types";
import { kbdPaddingXMap, kbdSizeMap, typographyMap } from "./kbd.variants";
import { vars } from "../../tokens/vars.css";
import { pxToRem } from "../../utils/cssUnit";

const sizeVariants = styleVariants(kbdSizeMap, ({ height, minWidth }) => ({
  height: pxToRem(height),
  minWidth: pxToRem(minWidth),
}));

const typeVariants = styleVariants(kbdPaddingXMap, paddingX => ({
  paddingLeft: pxToRem(paddingX),
  paddingRight: pxToRem(paddingX),
}));

const typographyCompoundVariants = Object.entries(typographyMap).flatMap(([type, sizeMap]) =>
  Object.entries(sizeMap).map(([size, typographyClassName]) => ({
    variants: { type, size },
    style: typographyClassName,
  })),
) as Array<{
  variants: { type: KbdType; size: KbdSize };
  style: string;
}>;

export const kbd = recipe({
  base: {
    boxSizing: "initial",

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: vars.scheme.semantic.spacing["1"],

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
  defaultVariants: {
    type: "key",
    size: "md",
    muted: false,
  },
});
