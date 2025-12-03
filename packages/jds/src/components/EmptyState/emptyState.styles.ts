import isPropValid from "@emotion/is-prop-valid";
import type { CSSObject, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { pxToRem } from "utils";

import type { EmptyStateProps } from "./emptyState.types";

import { BlockButton, Label } from "@/components";

const variantStylesMap = {
  outlined: (theme: Theme): CSSObject => ({
    border: `1px dashed ${theme.color.semantic.stroke.alpha.assistive}`,
  }),
  alpha: (theme: Theme): CSSObject => ({
    backgroundColor: theme.color.semantic.fill.subtlest,
  }),
};

const contentLayoutStylesMap: Record<
  NonNullable<EmptyStateProps["layout"]>,
  (theme: Theme) => CSSObject
> = {
  vertical: theme => ({
    gap: theme.scheme.semantic.spacing[12],
  }),
  horizontal: theme => ({
    alignItems: "flex-start",
    gap: theme.scheme.semantic.spacing[10],
  }),
};

export const EmptyStateRoot = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $variant: NonNullable<EmptyStateProps["variant"]>;
  $layout: NonNullable<EmptyStateProps["layout"]>;
}>(({ theme, $variant, $layout }) => ({
  display: "flex",
  flexDirection: $layout === "vertical" ? "column" : "row",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  maxWidth: pxToRem(590),
  minWidth: pxToRem(360),
  gap: theme.scheme.semantic.spacing[24],
  padding: `${theme.scheme.semantic.margin.lg} ${theme.scheme.semantic.margin.sm}`,
  borderRadius: theme.scheme.semantic.radius[8],
  ...($variant !== "empty" ? variantStylesMap[$variant](theme) : {}),
}));

export const EmptyStateContentDiv = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $layout: NonNullable<EmptyStateProps["layout"]>;
}>(({ theme, $layout }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.scheme.semantic.spacing[0],
  ...contentLayoutStylesMap[$layout](theme),
}));

export const EmptyStateLabel = styled(Label)(({ theme }) => ({
  flex: 1,
  color: theme.color.semantic.object.neutral,
}));

export const EmptyStateBodyTextP = styled("p", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $layout: NonNullable<EmptyStateProps["layout"]>;
}>(({ theme, $layout }) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
  color: theme.color.semantic.object.assistive,
  textAlign: $layout === "vertical" ? "center" : "left",
  textOverflow: "ellipsis",
  ...theme.textStyle["semantic-textStyle-body-xs-normal"],
}));

export const EmptyStateButtonContainerDiv = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $hasSecondary: boolean;
}>(({ theme, $hasSecondary }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: pxToRem($hasSecondary ? 130 : 58),
    padding: theme.scheme.semantic.spacing[0],
    gap: theme.scheme.semantic.spacing[12],
  };
});

export const EmptyStateBlockButton = BlockButton.Basic;
