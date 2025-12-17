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
