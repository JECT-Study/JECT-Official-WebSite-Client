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
export interface TitleStyleOptions {
  size?: TitleSize;
}

export type BodySize = "lg" | "md" | "sm" | "xs" | "2xs";
export type BodyWeight = "bold" | "normal";
export interface BodyStyleOptions {
  size?: BodySize;
  weight?: BodyWeight;
}

export type SyntaxSize = "lg" | "md" | "sm" | "xs";
export interface SyntaxStyleOptions {
  size?: SyntaxSize;
}

export type LabelStyleOptions = Pick<LabelOwnProps, "size" | "weight">;

export const getLabelClassName = ({ size = "md", weight = "normal" }: LabelStyleOptions = {}) =>
  typographyStyles.label({
    size,
    weight,
  });

export const getTitleClassName = ({ size = "md" }: TitleStyleOptions = {}) =>
  typographyStyles.title({
    size,
  });

export const getBodyClassName = ({ size = "md", weight = "normal" }: BodyStyleOptions = {}) =>
  typographyStyles.body({
    size,
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
