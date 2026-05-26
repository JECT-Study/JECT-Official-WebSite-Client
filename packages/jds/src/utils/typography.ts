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

export const typography = {
  label: typographyStyles.label,
  title: typographyStyles.title,
  inheritColor: typographyStyles.inheritColor,
};

const typographyProps = new Set(["size", "textAlign", "weight", "cursor", "color", "as"]);

export const shouldForwardTypographyProp = (prop: string) => {
  return !prop.startsWith("$") && !typographyProps.has(prop);
};
