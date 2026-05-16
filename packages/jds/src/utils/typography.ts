import isPropValid from "@emotion/is-prop-valid";
import type { CSSObject, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import type { ElementType } from "react";

export const TEXT_ALIGN_MAPPING = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
} as const;

export type LabelSize = "lg" | "md" | "sm" | "xs";
export type LabelTextAlign = keyof typeof TEXT_ALIGN_MAPPING;
export type LabelWeight = "bold" | "normal" | "subtle";
export type LabelCursor = "pointer" | "default";
export type LabelOwnProps = {
  as?: ElementType;
  size?: LabelSize;
  textAlign?: LabelTextAlign;
  weight?: LabelWeight;
  cursor?: LabelCursor;
  color?: string;
  htmlFor?: string;
};

export type TitleSize = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
export type TitleTextAlign = keyof typeof TEXT_ALIGN_MAPPING;

export interface TitleStyleOptions {
  size?: TitleSize;
  textAlign?: TitleTextAlign;
  color?: string;
}

const typographyProps = new Set(["size", "textAlign", "weight", "cursor", "color"]);

export const shouldForwardTypographyProp = (prop: string) => {
  return isPropValid(prop) && !prop.startsWith("$") && !typographyProps.has(prop);
};

export const titleStylesMap = {
  "2xl": "semantic-textStyle-title-6",
  xl: "semantic-textStyle-title-5",
  lg: "semantic-textStyle-title-4",
  md: "semantic-textStyle-title-3",
  sm: "semantic-textStyle-title-2",
  xs: "semantic-textStyle-title-1",
} as const satisfies Record<TitleSize, keyof Theme["textStyle"]>;

export const getLabelTokenKey = (
  size: LabelSize,
  weight: LabelWeight,
): keyof Theme["textStyle"] => {
  return `semantic-textStyle-label-${size}-${weight}` as keyof Theme["textStyle"];
};

export const getLabelStyles = (
  theme: Theme,
  {
    size = "md",
    textAlign = "left",
    weight = "normal",
    cursor = "default",
  }: LabelOwnProps & Record<string, unknown>,
): CSSObject => ({
  display: "flex",
  justifyContent: TEXT_ALIGN_MAPPING[textAlign],
  alignItems: "center",
  color: theme.color.semantic.object.bold,
  cursor,
  ...theme.textStyle[getLabelTokenKey(size, weight)],
});

export const getTitleStyles = (
  theme: Theme,
  { size = "md", textAlign = "left", color }: TitleStyleOptions,
): CSSObject => ({
  display: "flex",
  justifyContent: TEXT_ALIGN_MAPPING[textAlign],
  alignItems: "center",
  color: color || theme.color.semantic.object.bolder,
  cursor: "default",
  ...theme.textStyle[titleStylesMap[size]],
});

export const TypographyLabel = styled("span", {
  shouldForwardProp: shouldForwardTypographyProp,
})<LabelOwnProps>(({ theme, color, ...props }) => ({
  ...getLabelStyles(theme, props),
  ...(color ? { color } : {}),
}));
