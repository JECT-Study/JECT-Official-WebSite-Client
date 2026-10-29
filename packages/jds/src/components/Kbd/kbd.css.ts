import { createVar, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import type { KbdSize, KbdType } from "./kbd.types";

const borderColor = createVar();
const kbdHeight = createVar();

const sizeVariants = {
  lg: { vars: { [kbdHeight]: pxToRem(26) }, minWidth: pxToRem(20) },
  md: { vars: { [kbdHeight]: pxToRem(24) }, minWidth: pxToRem(19) },
  sm: { vars: { [kbdHeight]: pxToRem(22) }, minWidth: pxToRem(19) },
} satisfies Record<KbdSize, StyleRule>;

const typeVariants = {
  // function 키는 너비를 높이와 같게 고정해 정사각형으로 그린다.
  function: { width: kbdHeight, paddingInline: vars.scheme.semantic.spacing["4"] },
  key: { paddingInline: vars.scheme.semantic.spacing["6"] },
  text: { paddingInline: vars.scheme.semantic.spacing["6"] },
} satisfies Record<KbdType, StyleRule>;

export const kbd = recipe({
  base: {
    alignItems: "center",
    height: kbdHeight,
    borderRadius: vars.scheme.semantic.radius["4"],
    boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["1"]} ${borderColor}`,
    color: vars.color.semantic.object.neutral,
    vars: {
      [borderColor]: vars.color.semantic.stroke.alpha.subtle,
    },
    "@media": {
      // 고대비 모드는 box-shadow를 지우므로 테두리를 border로 되살린다.
      "(forced-colors: active)": {
        border: `${vars.scheme.semantic.strokeWeight["1"]} solid currentColor`,
      },
    },
    selectors: {
      "&&": {
        display: "inline-flex",
        justifyContent: "center",
        cursor: "inherit",
        // 운영체제의 고정폭 글꼴을 먼저 쓰고, ui-monospace를 지원하지 않는 브라우저는 syntax 글꼴로 대체한다.
        fontFamily: `ui-monospace, ${vars.typo.primitive.typeface.syntax}, monospace`,
      },
    },
  },
  variants: {
    type: typeVariants,
    size: sizeVariants,
    isMuted: {
      true: {
        color: vars.color.semantic.object.subtle,
        vars: {
          [borderColor]: vars.color.semantic.stroke.alpha.subtler,
        },
      },
      false: {},
    },
  },
});
