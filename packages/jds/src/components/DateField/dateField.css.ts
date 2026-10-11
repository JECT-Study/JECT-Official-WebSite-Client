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
  fontVariantNumeric: "tabular-nums",
  // 항상 세그먼트 단위로 선택하므로 캐럿을 보이지 않는다.
  caretColor: "transparent",
  color: fallbackVar(inputTextColor, vars.color.semantic.object.bolder),
  "::placeholder": {
    color: fallbackVar(placeholderTextColor, vars.color.semantic.object.assistive),
  },
  selectors: {
    "&::selection": {
      backgroundColor: vars.color.semantic.accent.alpha.subtler,
    },
    // 포커스 중 연, 월, 일이 모두 비어 있으면 빈 값 형식을 placeholder와 같은 색으로 표시한다.
    "&[data-empty]": {
      vars: { [inputTextColor]: vars.color.semantic.object.assistive },
    },
    "&[data-readonly]:not(:disabled)": {
      cursor: "default",
    },
    "&:disabled": {
      cursor: "not-allowed",
      vars: {
        [inputTextColor]: vars.color.semantic.object.assistive,
        [placeholderTextColor]: vars.color.semantic.object.subtler,
      },
    },
  },
});

export const pickerButton = style({
  position: "relative",
  zIndex: 1,
});

export const picker = style({
  zIndex: vars.environment.semantic.zIndex.floated,
});

export const suffix = style({
  position: "relative",
  zIndex: 1,
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
});
