import { createVar, fallbackVar, style } from "@vanilla-extract/css";

import { vars } from "../tokens/vars.css";

/**
 * @description
 * overlay 색상 — 호출자가 hierarchy 등 컨텍스트에 맞게 할당
 */
export const overlayColor = createVar();

/**
 * @description
 * hover / pressed opacity — 외부 override 가능 (기본 0.08 / 0.12)
 *
 * destructive에서 hover만 진하게, light/dark에서 opacity 차이 등의
 * 사용처별 변형이 필요할 때 사용처에서 assignInlineVars로 덮는다.
 */
export const overlayHoverOpacity = createVar();
export const overlayPressedOpacity = createVar();

/**
 * @description
 * hover / pressed 상태에서 ::after에 색상 overlay를 표시한다.
 *
 * shape(inset, borderRadius)는 호출자가 결정한다 — overlay가 어떤 영역을
 * 채워야 하는지는 컴포넌트 컨텍스트에 따라 다르므로,
 * 이 유틸은 ::after pseudo-element와 상태별 opacity 전환 룰만 책임진다.
 *
 * @example
 *   selectors: {
 *     "&::after": { inset: 0, borderRadius: "inherit" },     // element 외경
 *     "&::after": { inset: -4, borderRadius: "4px" },         // 확장된 탭 영역
 *   }
 */
export const overlay = style({
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      pointerEvents: "none",
      backgroundColor: overlayColor,
      opacity: 0,
      transition: `opacity ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,
    },
    "&[data-hovered]::after": {
      opacity: fallbackVar(overlayHoverOpacity, "0.08"),
    },
    "&[data-pressed]::after": {
      opacity: fallbackVar(overlayPressedOpacity, "0.12"),
      transition: "none",
    },
  },
});
