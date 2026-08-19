import * as typographyStyles from "./typography.css";
import type { BodyStyleOptions, LabelStyleOptions, TitleStyleOptions } from "./typography.types";

export * from "./typography.types";

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

const typographyProps = new Set(["size", "textAlign", "weight", "cursor", "color", "as"]);

export const shouldForwardTypographyProp = (prop: string) => {
  return !prop.startsWith("$") && !typographyProps.has(prop);
};
