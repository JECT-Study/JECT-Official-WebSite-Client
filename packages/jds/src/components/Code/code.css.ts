import type { StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { textStyles, vars } from "tokens";

import type { CodeSize } from "./code.types";

export const codeTypography: Record<CodeSize, StyleRule> = {
  lg: textStyles.syntax.lg,
  md: textStyles.syntax.md,
  sm: textStyles.syntax.sm,
  xs: textStyles.syntax.xs,
};

export const code = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    padding: `${vars.scheme.semantic.spacing["0"]} ${vars.scheme.semantic.spacing["6"]}`,
    borderRadius: vars.scheme.semantic.radius["4"],
    background: vars.color.semantic.fill.subtlest,
    border: `1px solid ${vars.color.semantic.stroke.alpha.assistive}`,
    color: vars.color.semantic.object.bold,
    cursor: "text",
  },
  variants: {
    size: codeTypography,
  },
});
