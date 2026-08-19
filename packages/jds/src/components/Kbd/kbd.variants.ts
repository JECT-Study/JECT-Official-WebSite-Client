import type { StyleRule } from "@vanilla-extract/css";
import { textStyles } from "tokens";

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

export const typographyMap = {
  function: {
    lg: textStyles.label.lg.normal,
    md: textStyles.label.md.normal,
    sm: textStyles.label.sm.normal,
    xs: textStyles.label.xs.normal,
  },
  key: {
    lg: textStyles.syntax.lg,
    md: textStyles.syntax.md,
    sm: textStyles.syntax.sm,
    xs: textStyles.syntax.xs,
  },
  text: {
    lg: textStyles.syntax.lg,
    md: textStyles.syntax.md,
    sm: textStyles.syntax.sm,
    xs: textStyles.syntax.xs,
  },
} satisfies Record<KbdType, Record<KbdSize, StyleRule>>;
