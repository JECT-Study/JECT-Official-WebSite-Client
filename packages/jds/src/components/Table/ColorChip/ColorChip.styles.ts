import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";

export const StyledColorChip = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{ $color: string }>(({ theme, $color }) => {
  return {
    flexShrink: 0,

    width: "1rem",
    height: "1rem",

    backgroundColor: $color,
    border: `1px solid ${theme.color.semantic.stroke.subtle}`,
  };
});
