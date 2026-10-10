import { style } from "@vanilla-extract/css";
import { vars } from "tokens";

export const input = style({
  position: "absolute",
  inset: `calc(-1 * ${vars.scheme.semantic.strokeWeight["1"]})`,
  opacity: 0,
  cursor: "inherit",
  selectors: {
    // 브라우저 기본 스타일이 파일 선택 버튼의 커서를 따로 지정하므로, 버튼 영역도 FieldContent의 커서를 따르게 한다.
    "&::file-selector-button": {
      cursor: "inherit",
    },
  },
});

export const value = style({
  display: "flex",
  flex: "1 0 0",
  alignItems: "center",
  minWidth: 0,
  gap: vars.scheme.semantic.spacing["8"],
  color: vars.color.semantic.object.bolder,
  selectors: {
    "[data-disabled] &": {
      color: vars.color.semantic.object.assistive,
    },
  },
});

export const icon = style({
  flexShrink: 0,
  color: vars.color.semantic.object.alternative,
  selectors: {
    "[data-disabled] &": {
      color: vars.color.semantic.object.subtler,
    },
  },
});

export const fileName = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const placeholder = style([
  fileName,
  {
    color: vars.color.semantic.object.assistive,
    selectors: {
      "[data-disabled] &": {
        color: vars.color.semantic.object.subtler,
      },
    },
  },
]);

export const clearButton = style({
  position: "relative",
  zIndex: 1,
});

export const suffix = style({
  position: "relative",
  zIndex: 1,
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
});
