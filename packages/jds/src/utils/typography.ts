import type { ElementType } from "react";

import * as typographyStyles from "./typography.css";
import type {
  BodyStyleOptions,
  LabelSize,
  LabelStyleOptions,
  LabelWeight,
  TitleStyleOptions,
} from "./typography.types";

export * from "./typography.types";

export const TEXT_ALIGN_MAPPING = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
} as const;

export type LabelTextAlign = keyof typeof TEXT_ALIGN_MAPPING;
export type LabelCursor = "pointer" | "default";
export type LabelOwnProps = {
  as?: ElementType;
  size?: LabelSize;
  textAlign?: LabelTextAlign;
  weight?: LabelWeight;
  cursor?: LabelCursor;
  htmlFor?: string;
};

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

export const typography = {
  label: typographyStyles.label,
  body: typographyStyles.body,
  title: typographyStyles.title,
  inheritColor: typographyStyles.inheritColor,
};

const typographyProps = new Set(["size", "textAlign", "weight", "cursor", "color", "as"]);

export const shouldForwardTypographyProp = (prop: string) => {
  return !prop.startsWith("$") && !typographyProps.has(prop);
};
