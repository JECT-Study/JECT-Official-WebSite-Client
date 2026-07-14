import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";

import { labelColorVar } from "../../utils/typography.css";

const textColor = createVar();

export const control = recipe({
  base: {
    display: "block",
    width: "100%",
    minWidth: 0,
    minHeight: "3rem",
    padding: 0,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    resize: "vertical",
    position: "relative",
    zIndex: 1,
    color: fallbackVar(textColor, vars.color.semantic.object.boldest),
    "::placeholder": {
      color: vars.color.semantic.object.assistive,
    },
  },
  variants: {
    disabled: {
      true: { resize: "none", vars: { [textColor]: vars.color.semantic.object.assistive } },
      false: {},
    },
    readOnly: {
      true: { resize: "none" },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { disabled: false, readOnly: true },
      style: { vars: { [textColor]: vars.color.semantic.object.subtle } },
    },
  ],
});

/**
 * Field.Content(박스) 안에서 textarea 와 counter 를 세로로 쌓는 컬럼 영역이에요.
 * counter 는 박스 내부 우측 하단에 위치해요.
 */
export const body = style({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 0",
  minWidth: 0,
  gap: vars.scheme.semantic.spacing["12"],
});

export const counter = style({
  alignSelf: "flex-end",
  flexShrink: 0,
  whiteSpace: "nowrap",
  vars: { [labelColorVar]: vars.color.semantic.object.alternative },
});
