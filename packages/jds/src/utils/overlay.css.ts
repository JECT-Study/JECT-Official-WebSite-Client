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
 * 이 유틸은 ::after를 hover / pressed overlay 전용으로 점유한다. 인터랙티브
 * 컴포넌트의 ::after에 다른 용도(divider/arrow/shimmer 등)를 추가 점유하면
 * overlay가 가려진다. 비인터랙티브 시각 효과는 별도 element로 표현해야 한다.
 *
 * @see ./PSEUDO_ELEMENT_POLICY.md — pseudo-element 자원 할당 정책
 *
 * @requires
 * - 호출자는 element에 `position: relative`(또는 다른 positioned 값)를 부여해야 한다.
 *   ::after가 position: absolute이므로 positioned ancestor가 없으면 viewport 기준으로 잡힌다.
 * - 호출자는 `&::after`에 inset과 borderRadius를 직접 지정해야 한다.
 *   shape는 컴포넌트 컨텍스트에 따라 다르므로 이 유틸이 가정하지 않는다.
 *
 * @example
 *   // 케이스 1: 시각 영역 = 탭 영역인 일반 컴포넌트
 *   selectors: {
 *     "&::after": { inset: 0, borderRadius: "inherit" },
 *   }
 *
 * @example
 *   // 케이스 2: 탭 영역이 시각 영역보다 큰 컴포넌트 (IconButton condensed 등)
 *   selectors: {
 *     "&::after": { inset: pxToRem(-4), borderRadius: "4px" },
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
      // pressed는 즉각 반응이 자연스러워 transition을 끈다
      transition: "none",
    },
  },
});
