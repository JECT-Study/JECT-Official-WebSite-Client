import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import type { CodeSize } from "./code.types";

export const codeTypographyClassName: Record<CodeSize, string> = {
  lg: "semantic-textStyle-syntax-lg",
  md: "semantic-textStyle-syntax-md",
  sm: "semantic-textStyle-syntax-sm",
  xs: "semantic-textStyle-syntax-xs",
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
    size: codeTypographyClassName,
  },
  defaultVariants: {
    size: "md",
  },
});
