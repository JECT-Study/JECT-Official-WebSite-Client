import isPropValid from "@emotion/is-prop-valid";
import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";

const TEXT_ALIGN_MAPPING = {
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
  $color?: string;
}

const getLabelTokenKey = (size: LabelSize, weight: LabelWeight): keyof Theme["textStyle"] => {
  return `semantic-textStyle-label-${size}-${weight}` as keyof Theme["textStyle"];
};

/**
 * LabelStyled - Label 컴포넌트의 스타일드 컴포넌트
 *
 * styled('label')을 사용하여 Emotion의 polymorphic `as` prop 지원
 */
export const LabelStyled = styled("label", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<LabelStyledProps>(({ theme, $size, $textAlign, $weight, $color }) => {
  const tokenKey = getLabelTokenKey($size, $weight);
  const justifyContent = TEXT_ALIGN_MAPPING[$textAlign];

  return {
    display: "flex",
    justifyContent,
    alignItems: "center",
    color: $color ?? theme.color.semantic.object.bold,
    cursor: "inherit",
    ...theme.textStyle[tokenKey],
  };
});
