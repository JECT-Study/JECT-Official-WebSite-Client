import type { Theme } from "@emotion/react";
import type { CSSObject } from "@emotion/react";

import {
  getLabelTokenKey,
  TEXT_ALIGN_MAPPING,
  type LabelSize,
  type LabelTextAlign,
  type LabelWeight,
} from "./Label.style";

/**
 * @description
 * Label 컴포넌트의 텍스트 스타일을 다른 컴포넌트에서 재사용하기 위한 유틸리티입니다.
 * Label.style.ts의 스타일 로직을 복제하되, **color는 제외**합니다.
 *
 * @param theme - Emotion 테마 객체
 * @param options - 스타일 옵션 (color 제외)
 * @returns Label 스타일 CSSObject (color 제외)
 *
 * @see {@link LabelStyled} - 원본 Label 스타일 구현
 */
export const createLabelStyles = (
  theme: Theme,
  options: {
    size: LabelSize;
    weight: LabelWeight;
    textAlign?: LabelTextAlign;
  },
): CSSObject => {
  const { size, weight, textAlign = "left" } = options;
  const tokenKey = getLabelTokenKey(size, weight);
  const justifyContent = TEXT_ALIGN_MAPPING[textAlign];

  // NOTE: 이 구현은 Label.style.ts와 동기화(color는 제외 - 각 컴포넌트에서 semantic color를 명시적으로 지정)
  return {
    display: "flex",
    justifyContent,
    alignItems: "center",
    cursor: "default",
    ...theme.textStyle[tokenKey],
  } as CSSObject;
};
