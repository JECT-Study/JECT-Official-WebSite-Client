import styled from "@emotion/styled";

export const StyledIconWrapper = styled.span({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  "& > svg": {
    display: "block",
    flexShrink: 0,
  },
});
