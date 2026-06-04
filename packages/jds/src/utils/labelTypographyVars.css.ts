import { vars } from "tokens";

import type { LabelSize, LabelWeight } from "./typography";

const labelVarsBySize = (weight: LabelWeight) =>
  ({
    lg: {
      fontSize: vars.typo.primitive.fontSize.label.lg,
      lineHeight: vars.typo.primitive.font.lineHeight.label.lg,
      fontFamily: vars.typo.primitive.typeface.label,
      fontWeight: vars.typo.primitive.fontWeight.label[weight],
      letterSpacing: vars.typo.primitive.font.letterSpacing.label.lg,
    },
    md: {
      fontSize: vars.typo.primitive.fontSize.label.md,
      lineHeight: vars.typo.primitive.font.lineHeight.label.md,
      fontFamily: vars.typo.primitive.typeface.label,
      fontWeight: vars.typo.primitive.fontWeight.label[weight],
      letterSpacing: vars.typo.primitive.font.letterSpacing.label.md,
    },
    sm: {
      fontSize: vars.typo.primitive.fontSize.label.sm,
      lineHeight: vars.typo.primitive.font.lineHeight.label.sm,
      fontFamily: vars.typo.primitive.typeface.label,
      fontWeight: vars.typo.primitive.fontWeight.label[weight],
      letterSpacing: vars.typo.primitive.font.letterSpacing.label.sm,
    },
    xs: {
      fontSize: vars.typo.primitive.fontSize.label.xs,
      lineHeight: vars.typo.primitive.font.lineHeight.label.xs,
      fontFamily: vars.typo.primitive.typeface.label,
      fontWeight: vars.typo.primitive.fontWeight.label[weight],
      letterSpacing: vars.typo.primitive.font.letterSpacing.label.xs,
    },
  }) satisfies Record<LabelSize, object>;

export const labelTypographyVars = {
  bold: labelVarsBySize("bold"),
  normal: labelVarsBySize("normal"),
  subtle: labelVarsBySize("subtle"),
} satisfies Record<LabelWeight, Record<LabelSize, object>>;
