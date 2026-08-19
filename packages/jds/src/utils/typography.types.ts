export type LabelSize = "lg" | "md" | "sm" | "xs";
export type LabelWeight = "bold" | "normal" | "subtle";
export interface LabelStyleOptions {
  size?: LabelSize;
  weight?: LabelWeight;
}

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
