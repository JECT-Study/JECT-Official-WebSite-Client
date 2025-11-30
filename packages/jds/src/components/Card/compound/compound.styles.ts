import isPropValid from "@emotion/is-prop-valid";
import type { CSSObject, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { InteractionLayer, shadow } from "utils";

import { createLabelStyles } from "../../Label/createLabelStyles";
import type { CardLayout, CardVariant, CardStyle } from "../Card.types";

const SHADOW_DEFAULT = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";

const BORDER_RADIUS = {
  plate: 12,
  post: {
    outlined: 10,
    empty: 10,
  },
} as const;

const INTERACTION_OFFSET = {
  plate: { vertical: 0, horizontal: 0 },
  post: {
    outlined: { vertical: 0, horizontal: 0 },
    empty: { vertical: 12, horizontal: 12 },
  },
} as const;

const getLayoutStyles = (layout: CardLayout): CSSObject => ({
  flexDirection: layout === "vertical" ? "column" : "row",
});

const getBorderRadius = (variant: CardVariant, cardStyle?: CardStyle): number => {
  if (variant === "plate") return BORDER_RADIUS.plate;
  return BORDER_RADIUS.post[cardStyle || "outlined"];
};

const getVariantStyles = (
  theme: Theme,
  variant: CardVariant,
  cardStyle: CardStyle | undefined,
): CSSObject => {
  const borderRadius = getBorderRadius(variant, cardStyle);

  if (variant === "post") {
    if (cardStyle === "empty") {
      return {
        backgroundColor: "transparent",
        border: "none",
        padding: "0",
        borderRadius: borderRadius === 0 ? "0" : `${borderRadius}px`,
        boxShadow: "none",
        overflow: "visible",
      };
    }

    return {
      border: `1px solid ${theme.color.semantic.stroke.subtle}`,
      padding: theme.scheme.semantic.spacing[20],
      borderRadius: `${borderRadius}px`,
      backgroundColor: theme.color.semantic.surface.shallow,
      boxShadow: SHADOW_DEFAULT,
      overflow: "visible",
    };
  }

  return {
    padding: 0,
    borderRadius: `${borderRadius}px`,
    backgroundColor: theme.color.semantic.surface.shallow,
    border: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
    boxShadow: SHADOW_DEFAULT,
  };
};

const getGap = (
  theme: Theme,
  variant: CardVariant,
  layout: CardLayout,
  cardStyle?: CardStyle,
): string | number => {
  if (variant === "plate") return 0;

  if (layout === "vertical") return 0;

  return cardStyle === "empty"
    ? theme.scheme.semantic.spacing[24]
    : theme.scheme.semantic.spacing[20];
};

const getColorVariables = (theme: Theme, isDisabled: boolean): CSSObject => ({
  "--card-title-color": isDisabled
    ? theme.color.semantic.object.subtle
    : theme.color.semantic.object.bolder,
  "--card-label-color": isDisabled
    ? theme.color.semantic.object.subtle
    : theme.color.semantic.object.neutral,
  "--card-body-color": isDisabled
    ? theme.color.semantic.object.subtle
    : theme.color.semantic.object.normal,
  "--card-caption-color": isDisabled
    ? theme.color.semantic.object.subtle
    : theme.color.semantic.object.alternative,
});

const createInteractionLayer = (
  theme: Theme,
  state: "rest" | "hover" | "active" | "focus",
  borderRadius: number,
) =>
  InteractionLayer({
    theme,
    state,
    variant: "normal",
    density: "assistive",
    fillColor: "default",
    isDisabled: false,
    offsetVertical: 0,
    offsetHorizontal: 0,
    borderRadius,
  });

const getImageBorderRadius = (layout: CardLayout, variant: CardVariant): CSSObject => {
  if (variant === "post") return {};

  if (layout === "vertical") {
    return {
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    };
  }

  return {
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: 0,
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: 0,
  };
};

const getImageSize = (layout: CardLayout): CSSObject => {
  if (layout === "vertical") {
    return { width: "100%" };
  }

  return {
    height: "100%",
    alignSelf: "stretch",
  };
};

const getContentStyles = (theme: Theme, variant: CardVariant, layout: CardLayout): CSSObject => {
  const baseStyles: CSSObject = {
    padding: theme.scheme.semantic.spacing[20],
    gap: theme.scheme.semantic.spacing[16],
  };

  if (variant === "post" && layout === "horizontal") {
    return { gap: theme.scheme.semantic.spacing[16] };
  }

  const border =
    variant === "plate"
      ? layout === "vertical"
        ? { borderTop: `1px solid ${theme.color.semantic.stroke.alpha.subtler}` }
        : { borderLeft: `1px solid ${theme.color.semantic.stroke.alpha.subtler}` }
      : {};

  return {
    ...baseStyles,
    alignSelf: "stretch",
    ...border,
  };
};

const getTextEllipsisStyles = (lineClamp: number): CSSObject => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lineClamp,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

// 실제 스타일링 부분

export const StyledCardRoot = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $layout: CardLayout;
  $variant: CardVariant;
  $cardStyle?: CardStyle;
  $isDisabled: boolean;
}>(({ theme, $layout, $variant, $cardStyle, $isDisabled }) => {
  const hasShadowOnRoot = !($variant === "post" && $cardStyle === "empty");

  return {
    position: "relative",
    zIndex: 0,
    display: "flex",
    gap: getGap(theme, $variant, $layout, $cardStyle),
    ...getLayoutStyles($layout),
    ...getVariantStyles(theme, $variant, $cardStyle),
    width: "100%",
    height: "100%",
    ...getColorVariables(theme, $isDisabled),

    '&[data-interactive="true"]': {
      transition: `transform ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}${
        hasShadowOnRoot
          ? `, box-shadow ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}`
          : ""
      }`,
      "&:hover": {
        transform: "translateY(-2px)",
        ...(hasShadowOnRoot && shadow(theme, "raised")),
      },
      "&:active": {
        transform: "translateY(0)",
        transition: "none",
      },
      "&:has([data-overlay]:focus-visible)": {
        transform: "translateY(-2px)",
        ...(hasShadowOnRoot && shadow(theme, "raised")),
      },
    },
  };
});

export const StyledCardImageContainer = styled.div<{
  $layout: CardLayout;
  $variant: CardVariant;
  $cardStyle?: CardStyle;
}>(({ $layout, $variant }) => ({
  flexShrink: 0,
  overflow: "hidden",
  ...getImageBorderRadius($layout, $variant),
  ...getImageSize($layout),
}));

export const StyledCardContent = styled.div<{
  $variant: CardVariant;
  $layout: CardLayout;
}>(({ theme, $variant, $layout }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  flex: "1 0 0",
  ...getContentStyles(theme, $variant, $layout),
}));

export const StyledCardMeta = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: 0,
  alignSelf: "stretch",
  gap: theme.scheme.semantic.spacing[16],
}));

export const StyledCardMetaItem = styled("span", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: "sm", weight: "normal" }),
  color: "var(--card-caption-color)",
}));

export const StyledCardMetaNudgeItem = styled.span(({ theme }) => ({
  display: "flex",
  padding: 0,
  alignItems: "center",
  gap: theme.scheme.semantic.spacing[4],
  marginLeft: "auto",
  flexShrink: 0,
  opacity: 0,
  color: "var(--card-caption-color)",
  transition: `opacity ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}, transform ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}`,

  '[data-interactive="true"]:hover &': {
    opacity: 1,
    transform: "translateX(2px)",
  },
}));

export const StyledCardMetaNudgeItemLabel = styled.span(({ theme }) => ({
  ...createLabelStyles(theme, { size: "sm", weight: "normal" }),
  color: "var(--card-caption-color)",
}));

export const StyledCardTitle = styled("h3", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: "lg", weight: "normal" }),
  color: "var(--card-title-color)",
  margin: 0,
  alignSelf: "stretch",
  ...getTextEllipsisStyles(1),
}));

export const StyledCardLabel = styled("h4", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: "lg", weight: "bold" }),
  color: "var(--card-label-color)",
  margin: 0,
  alignSelf: "stretch",
  ...getTextEllipsisStyles(1),
}));

export const StyledCardBody = styled("p", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: "sm", weight: "normal" }),
  color: "var(--card-body-color)",
  margin: 0,
  alignSelf: "stretch",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
}));

export const StyledCardCaption = styled("span", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: "xs", weight: "subtle" }),
  color: "var(--card-caption-color)",
  ...getTextEllipsisStyles(1),
}));

export const StyledCardOverlay = styled("a", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $variant: CardVariant;
  $cardStyle?: CardStyle;
}>(({ theme, $variant, $cardStyle }) => {
  const offset =
    $variant === "plate"
      ? INTERACTION_OFFSET.plate
      : INTERACTION_OFFSET.post[$cardStyle || "outlined"];

  const borderRadius = getBorderRadius($variant, $cardStyle);

  const interactionParams = {
    rest: createInteractionLayer(theme, "rest", borderRadius),
    hover: createInteractionLayer(theme, "hover", borderRadius),
    active: createInteractionLayer(theme, "active", borderRadius),
    focus: createInteractionLayer(theme, "focus", borderRadius),
  };

  const hasVerticalOffset = offset.vertical > 0;
  const hasHorizontalOffset = offset.horizontal > 0;
  const hasOffset = hasVerticalOffset || hasHorizontalOffset;
  const hasShadowOnOverlay = $variant === "post" && $cardStyle === "empty";

  return {
    position: "absolute",
    top: hasVerticalOffset ? `-${offset.vertical}px` : 0,
    left: hasHorizontalOffset ? `-${offset.horizontal}px` : 0,
    right: hasHorizontalOffset ? `-${offset.horizontal}px` : undefined,
    bottom: hasVerticalOffset ? `-${offset.vertical}px` : undefined,
    width: hasHorizontalOffset ? "auto" : "100%",
    height: hasVerticalOffset ? "auto" : "100%",
    zIndex: 100,
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    borderRadius: borderRadius > 0 ? `${borderRadius}px` : 0,
    outline: "none",
    transition: hasShadowOnOverlay
      ? `box-shadow ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}`
      : undefined,
    "::before": {
      ...interactionParams.rest["::before"],
      transition: `opacity ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}`,
    },
    "::after": {
      ...interactionParams.rest["::after"],
      transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
    },
    "&:hover": {
      ...(hasShadowOnOverlay && shadow(theme, "raised")),
      "::after": {
        ...interactionParams.hover["::after"],
        transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
      },
    },
    "&:active": {
      "::after": {
        ...interactionParams.active["::after"],
        transition: "none",
      },
    },
    "&:focus-visible": {
      ...(hasShadowOnOverlay
        ? shadow(theme, "raised")
        : !hasOffset &&
          interactionParams.focus.boxShadow && {
            boxShadow: interactionParams.focus.boxShadow,
          }),
      "::before": {
        ...interactionParams.focus["::before"],
        ...(hasOffset && { opacity: 1 }),
      },
    },
  };
});
