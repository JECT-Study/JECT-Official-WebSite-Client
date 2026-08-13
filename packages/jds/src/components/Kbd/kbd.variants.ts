import type { KbdSize, KbdType } from "./kbd.types";

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
