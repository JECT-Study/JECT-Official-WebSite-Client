import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { vars } from "tokens";

const inputTextColor = createVar();
const placeholderTextColor = createVar();

export const input = style({
  flex: "1 0 0",
  minWidth: 0,
  padding: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 1,
  textAlign: "left",
  color: fallbackVar(inputTextColor, vars.color.semantic.object.bolder),
  "::placeholder": {
    color: fallbackVar(placeholderTextColor, vars.color.semantic.object.assistive),
  },
  selectors: {
    "&[data-readonly]:not(:disabled)": {
      cursor: "default",
    },
    "&:disabled": {
      cursor: "not-allowed",
      vars: {
        [inputTextColor]: vars.color.semantic.object.subtle,
        [placeholderTextColor]: vars.color.semantic.object.subtler,
      },
    },
  },
});

// 매초 숫자가 바뀌어도 글리프 폭이 달라 텍스트가 흔들리지 않도록 고정폭 숫자를 사용한다.
export const timer = style({
  position: "relative",
  fontVariantNumeric: "tabular-nums",
});

export const affix = style({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
});
