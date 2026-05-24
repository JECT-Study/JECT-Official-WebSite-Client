import type { textStyleClassNames } from "tokens";

import type { KbdSize, KbdType } from "./kbd.types";

type TextStyleClassName = (typeof textStyleClassNames)[number];

interface KbdSizeConfig {
  height: number;
  minWidth: number;
}

export const kbdSizeMap: Record<KbdSize, KbdSizeConfig> = {
  lg: { height: 26, minWidth: 16 },
  md: { height: 24, minWidth: 14 },
  sm: { height: 22, minWidth: 11 },
  xs: { height: 20, minWidth: 9 },
};

export const kbdPaddingXMap: Record<KbdType, number> = {
  function: 4,
  key: 6,
  text: 6,
};

export const typographyMap = {
  function: {
    lg: "semantic-textStyle-label-lg-normal",
    md: "semantic-textStyle-label-md-normal",
    sm: "semantic-textStyle-label-sm-normal",
    xs: "semantic-textStyle-label-xs-normal",
  },
  key: {
    lg: "semantic-textStyle-syntax-lg",
    md: "semantic-textStyle-syntax-md",
    sm: "semantic-textStyle-syntax-sm",
    xs: "semantic-textStyle-syntax-xs",
  },
  text: {
    lg: "semantic-textStyle-syntax-lg",
    md: "semantic-textStyle-syntax-md",
    sm: "semantic-textStyle-syntax-sm",
    xs: "semantic-textStyle-syntax-xs",
  },
} satisfies Record<KbdType, Record<KbdSize, TextStyleClassName>>;
