import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { pxToRem } from "utils";

const inputTextColor = createVar();
const placeholderTextColor = createVar();

const INPUT_WRAP_THRESHOLD = pxToRem(100);

// 배지와 입력칸만 줄바꿈하고, 단축키는 박스 오른쪽 중앙에 남긴다.
// 배지 사이 빈 곳을 눌러도 박스를 누른 것으로 처리되도록 래퍼는 이벤트를 받지 않고, 배지와 입력칸만 이벤트를 받는다.
export const values = style({
  display: "flex",
  flex: "1 1 0",
  flexWrap: "wrap",
  alignItems: "center",
  minWidth: 0,
  gap: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["8"]}`,
  pointerEvents: "none",
});

export const input = style({
  flex: `1 1 ${INPUT_WRAP_THRESHOLD}`,
  minWidth: INPUT_WRAP_THRESHOLD,
  pointerEvents: "auto",
  padding: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 1,
  textOverflow: "ellipsis",
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
    // 포커스와 접근성 연결은 유지해야 하므로 요소는 남기고 배치에서만 뺀다.
    "&[data-collapsed]": {
      position: "absolute",
      width: 1,
      height: 1,
      minWidth: 0,
      opacity: 0,
      pointerEvents: "none",
    },
  },
});

export const tag = style({
  flexShrink: 0,
  maxWidth: "100%",
  pointerEvents: "auto",
});

export const popup = style({
  minWidth: "var(--radix-popover-trigger-width)",
  maxHeight: "var(--radix-popover-content-available-height)",
  zIndex: vars.environment.semantic.zIndex.floated,
});
