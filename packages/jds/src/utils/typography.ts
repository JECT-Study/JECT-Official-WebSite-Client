import type { ElementType } from "react";

import * as typographyStyles from "./typography.css";

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
  htmlFor?: string;
};

export type TitleSize = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
export type TitleTextAlign = keyof typeof TEXT_ALIGN_MAPPING;
export interface TitleStyleOptions {
  size?: TitleSize;
  textAlign?: TitleTextAlign;
}

export type BodySize = "lg" | "md" | "sm" | "xs" | "2xs";
export type BodyTextAlign = keyof typeof TEXT_ALIGN_MAPPING;
export type BodyWeight = "bold" | "normal";
export interface BodyStyleOptions {
  size?: BodySize;
  textAlign?: BodyTextAlign;
  weight?: BodyWeight;
}

export type SyntaxSize = "lg" | "md" | "sm" | "xs";
export interface SyntaxStyleOptions {
  size?: SyntaxSize;
}

export const getLabelClassName = ({
  size = "md",
  textAlign = "left",
  weight = "normal",
  cursor = "default",
}: LabelOwnProps = {}) =>
  typographyStyles.label({
    size,
    textAlign,
    weight,
    cursor,
  });

export const getTitleClassName = ({ size = "md", textAlign = "left" }: TitleStyleOptions = {}) =>
  typographyStyles.title({
    size,
    textAlign,
  });

export const getBodyClassName = ({
  size = "md",
  textAlign = "left",
  weight = "normal",
}: BodyStyleOptions = {}) =>
  typographyStyles.body({
    size,
    textAlign,
    weight,
  });

export const getSyntaxClassName = ({ size = "md" }: SyntaxStyleOptions = {}) =>
  typographyStyles.syntax({ size });

export const typography = {
  label: typographyStyles.label,
  body: typographyStyles.body,
  title: typographyStyles.title,
  syntax: typographyStyles.syntax,
  inheritColor: typographyStyles.inheritColor,
};

const typographyProps = new Set(["size", "textAlign", "weight", "cursor", "color", "as"]);

export const shouldForwardTypographyProp = (prop: string) => {
  return !prop.startsWith("$") && !typographyProps.has(prop);
};
