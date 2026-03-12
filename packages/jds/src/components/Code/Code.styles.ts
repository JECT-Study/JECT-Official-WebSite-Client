import isPropValid from "@emotion/is-prop-valid";
import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import type { CodeSize, CodeStyleProps } from "./Code.types";

export const codeTypographyMap: Record<CodeSize, string> = {
  lg: "semantic-textStyle-syntax-lg",
  md: "semantic-textStyle-syntax-md",
  sm: "semantic-textStyle-syntax-sm",
  xs: "semantic-textStyle-syntax-xs",
};

export const getCodeColors = (theme: Theme) => {
  return {
    bg: theme.color.semantic.fill.subtlest,
    border: theme.color.semantic.stroke.alpha.assistive,
    color: theme.color.semantic.object.bold,
  };
};

export const StyledCode = styled("code", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<CodeStyleProps>(({ theme, $size }) => {
  const codeTypographyKey = codeTypographyMap[$size];
  const codeColors = getCodeColors(theme);
  const textStyle = theme.textStyle[codeTypographyKey as keyof typeof theme.textStyle];

  return {
    display: "inline-flex",
    alignItems: "center",

    padding: `${theme.scheme.semantic.spacing[0]} ${theme.scheme.semantic.spacing[6]}`,

    borderRadius: theme.scheme.semantic.radius[4],
    background: codeColors.bg,

    border: `1px solid ${codeColors.border}`,
    color: codeColors.color,

    cursor: "text",
    ...textStyle,
  };
});
