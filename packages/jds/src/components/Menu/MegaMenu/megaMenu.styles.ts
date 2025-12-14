import styled from "@emotion/styled";
import { pxToRem, shadow } from "utils";

import { Label } from "@/components/Label";

export const StyledMegaMenuRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: pxToRem(480),
  backgroundColor: theme.color.semantic.surface.shallow,
  border: `1px solid ${theme.color.semantic.stroke.subtler}`,
  borderRadius: theme.scheme.semantic.radius[10],
  ...shadow(theme, "floated"),
}));

export const StyledMegaMenuSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: `${theme.scheme.semantic.margin.lg} ${theme.scheme.semantic.margin.xl}`,
  gap: theme.scheme.semantic.spacing[24],
}));

export const StyledLabel = styled(Label)(({ theme }) => ({
  color: theme.color.semantic.object.alternative,
}));

export const StyledMegaMenuGroup = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyItems: "flex-start",
  alignItems: "flex-start",
  gap: theme.scheme.semantic.spacing[24],
}));

export const StyledDivider = styled("hr")(({ theme }) => ({
  width: 0,
  border: "none",
  borderLeft: `1px solid ${theme.color.semantic.stroke.subtler}`,
  margin: 0,
}));
