import { createVar, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../tokens/vars.css";

export type FocusRingBorder = "outside" | "inside";
export type FocusRingFeedback = "none" | "destructive" | "positive";
export type FocusRingInteraction = "self" | "within" | "delegated";

const focusRingColor = createVar();
const focusRingShadow = createVar();

const focusRingColorMap = {
  none: vars.color.semantic.accent.alpha.alternative,
  destructive: vars.color.semantic.feedback.destructive.alpha.alternative,
  positive: vars.color.semantic.feedback.positive.alpha.alternative,
} satisfies Record<FocusRingFeedback, string>;

/**
 * focus-visible 상태에서 `::before`에 box-shadow ring을 그린다.
 *
 * `border`는 ring을 요소 바깥과 안쪽 중 어디에 그릴지, `feedback`은 ring 색, `interaction`은
 * focus를 어느 요소에서 읽을지 정한다. `self`는 요소 자신이 focus를 받을 때만, `within`은 자신 또는
 * 자손이 focus를 받을 때(`<label>`이 input을 감싸는 구조 등), `delegated`는 안쪽
 * `[data-interaction-target]`가 focus를 받을 때 그린다.
 * 요소의 `position: relative`와 `::before`의 inset, borderRadius는 호출부가 지정한다.
 *
 * @see ./PSEUDO_ELEMENT_POLICY.md
 * @example focusRing({ border: "inside", feedback: "destructive" })
 */
export const focusRing = recipe({
  base: {
    outline: "none",
    selectors: { "&::before": { content: '""', position: "absolute", pointerEvents: "none" } },
  },
  variants: {
    border: {
      outside: {
        vars: {
          [focusRingShadow]: `0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${focusRingColor}`,
        },
      },
      inside: {
        vars: {
          [focusRingShadow]: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${focusRingColor}`,
        },
      },
    } satisfies Record<FocusRingBorder, StyleRule>,
    feedback: {
      none: { vars: { [focusRingColor]: focusRingColorMap.none } },
      destructive: { vars: { [focusRingColor]: focusRingColorMap.destructive } },
      positive: { vars: { [focusRingColor]: focusRingColorMap.positive } },
    } satisfies Record<FocusRingFeedback, StyleRule>,
    interaction: {
      self: {
        selectors: {
          "&:focus-visible::before": {
            boxShadow: focusRingShadow,
            zIndex: 1,
          },
        },
      },
      within: {
        selectors: {
          "&:focus-visible::before, &:has(:focus-visible)::before": {
            boxShadow: focusRingShadow,
            zIndex: 1,
          },
        },
      },
      delegated: {
        selectors: {
          "&:has([data-interaction-target]:focus-visible)::before": {
            boxShadow: focusRingShadow,
            zIndex: 1,
          },
        },
      },
    } satisfies Record<FocusRingInteraction, StyleRule>,
  },
  defaultVariants: {
    border: "outside",
    feedback: "none",
    interaction: "self",
  },
});
