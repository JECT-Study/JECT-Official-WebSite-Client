import { globalStyle, style } from "@vanilla-extract/css";

// TODO: SVG generator를 forwardRef emit 형태로 갱신 후 wrapper 제거
//       — `<span data-part="icon"><svg /></span>` → `<svg data-part="icon" />` 로 평탄화
//       (anatomy part와 실제 DOM element가 1:1 매칭되어 외부 CSS selector / var cascade가 한 단계 줄어듦)
export const iconWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

globalStyle(`${iconWrapper} > svg`, {
  display: "block",
  flexShrink: 0,
});
