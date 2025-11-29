import isPropValid from "@emotion/is-prop-valid";
import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const TEXT_ALIGN_MAPPING = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
} as const;

export type LabelSize = "lg" | "md" | "sm" | "xs";
export type LabelTextAlign = keyof typeof TEXT_ALIGN_MAPPING;
export type LabelWeight = "bold" | "normal" | "subtle";

interface LabelStyledProps {
  $size: LabelSize;
  $textAlign: LabelTextAlign;
  $weight: LabelWeight;
}

export const getLabelTokenKey = (
  size: LabelSize,
  weight: LabelWeight,
): keyof Theme["textStyle"] => {
  return `semantic-textStyle-label-${size}-${weight}` as keyof Theme["textStyle"];
};

/**
 * @remarks
 * 이 컴포넌트는 createLabelStyles에 의존하지 않습니다.
 * createLabelStyles는 이 구현을 "복제"하여 다른 곳에서 사용할 수 있게 합니다.
 *
 * @see {@link createLabelStyles} - 이 스타일을 재사용하기 위한 유틸리티
 */
export const LabelStyled = styled("label", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<LabelStyledProps>(({ theme, $size, $textAlign, $weight }) => {
  const tokenKey = getLabelTokenKey($size, $weight);
  const justifyContent = TEXT_ALIGN_MAPPING[$textAlign];

  return {
    display: "flex",
    justifyContent,
    alignItems: "center",
    color: theme.color.semantic.object.bold,
    cursor: "default",
    ...theme.textStyle[tokenKey],
  };
});
