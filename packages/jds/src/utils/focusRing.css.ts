import { style } from "@vanilla-extract/css";

import { vars } from "../tokens/vars.css";

/**
 * @description
 * focus-visible 상태에서 ::before로 box-shadow ring을 그린다.
 *
 * shape(inset, borderRadius)는 호출자가 결정한다 — focus ring이 어떤 영역을
 * 둘러싸야 하는지(element 외경 vs 확장된 탭 영역)는 컴포넌트 컨텍스트에 따라 다르므로,
 * 이 유틸은 ::before pseudo-element와 focus-visible 시 ring 색상만 책임진다.
 *
 * @example
 *   selectors: {
 *     "&::before": { inset: 0, borderRadius: "inherit" },     // element 외경
 *     "&::before": { inset: -4, borderRadius: "4px" },         // 확장된 탭 영역
 *   }
 */
export const focusRing = style({
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      pointerEvents: "none",
    },
    "&[data-focus-visible]::before": {
      boxShadow: `0 0 0 3px ${vars.color.semantic.interaction.focus}`,
    },
  },
});
