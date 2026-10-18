import { style } from "@vanilla-extract/css";

import { vars } from "../../../../tokens/vars.css";

const columnGap = vars.scheme.semantic.spacing["4"];

const itemHeight = `calc(${vars.typo.primitive.font.lineHeight.label.md} + 2 * ${vars.scheme.semantic.spacing["6"]})`;

export const root = style({
  position: "relative",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: columnGap,
  height: "100%",
  padding: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["4"]}`,
  scrollPaddingBlock: vars.scheme.semantic.spacing["10"],
  overflowX: "clip",
  overflowY: "auto",
  overscrollBehavior: "contain",
  outline: "none",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": { display: "none" },
  },
});

/** 마지막 항목도 열의 맨 위까지 스크롤되도록 채우는 끝 여백 */
export const endSpacer = style({
  flexShrink: 0,
  height: `calc(100% - ${itemHeight} - ${columnGap})`,
  pointerEvents: "none",
});
