import type { KbdSize, KbdType } from "./Kbd.types";

interface KbdSizeConfig {
  height: number;
  minWidth: number;
  paddingX: number;
}

export const kbdSizeMap: Record<KbdSize, KbdSizeConfig> = {
  lg: { height: 26, minWidth: 16, paddingX: 6 },
  md: { height: 24, minWidth: 14, paddingX: 6 },
  sm: { height: 22, minWidth: 11, paddingX: 6 },
  xs: { height: 20, minWidth: 9, paddingX: 6 },
};

export const typographyMap: Record<KbdType, Record<KbdSize, string>> = {
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
};
