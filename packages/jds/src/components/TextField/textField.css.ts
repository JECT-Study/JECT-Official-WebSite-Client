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

export const affix = style({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
});

// 값이 비면 지우기 버튼을 숨긴다. :placeholder-shown은 이벤트 없이 바뀐 값에도 브라우저가 바로 반영한다.
export const clearButton = style({
  selectors: {
    [`${input}:placeholder-shown ~ * &`]: {
      display: "none",
    },
  },
});

// 지우기 버튼만 있는 영역은 영역째 숨겨, 빈 영역이 간격을 차지하지 않게 한다.
export const clearButtonOnlyTrailing = style({
  selectors: {
    [`${input}:placeholder-shown ~ &`]: {
      display: "none",
    },
  },
});
