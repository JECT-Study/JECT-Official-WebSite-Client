import isPropValid from "@emotion/is-prop-valid";
import type { CSSObject, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { InteractionLayer, shadow } from "utils";

import { createLabelStyles } from "../../Label/createLabelStyles";
import type { CardLayout, CardVariant, CardStyle } from "../Card.types";

const SHADOW_DEFAULT = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";

const getLayoutStyles = (layout: CardLayout): CSSObject => {
  const layoutMap: Record<CardLayout, CSSObject> = {
    vertical: {
      flexDirection: "column",
    },
    horizontal: {
      flexDirection: "row",
    },
  };

  return layoutMap[layout];
};

const getVariantStyles = (
  theme: Theme,
  variant: CardVariant,
  style: CardStyle | undefined,
): { styles: CSSObject; borderRadius: number } => {
  const borderRadiusParams = {
    plate: 12,
    post: {
      outlined: 10,
      empty: 0,
    },
  } as const;

  const borderRadius =
    variant === "plate" ? borderRadiusParams.plate : borderRadiusParams.post[style || "outlined"];

  if (variant === "post") {
    const styleParams = {
      outlined: {
        border: `1px solid ${theme.color.semantic.stroke.subtle}`,
        padding: theme.scheme.semantic.spacing[20],
        borderRadius: `${borderRadius}px`,
        backgroundColor: theme.color.semantic.surface.shallow,
        boxShadow: SHADOW_DEFAULT,
        overflow: "visible" as const,
      },
      empty: {
        backgroundColor: "transparent",
        border: "none",
        padding: "0",
        borderRadius: borderRadius === 0 ? "0" : `${borderRadius}px`,
        boxShadow: "none",
        overflow: "visible" as const,
      },
    } as const;

    const selectedStyle = styleParams[style || "outlined"];

    return {
      styles: {
        ...selectedStyle,
      },
      borderRadius,
    };
  }

  return {
    styles: {
      padding: 0,
      borderRadius: `${borderRadius}px`,
      backgroundColor: theme.color.semantic.surface.shallow,
      border: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
      boxShadow: SHADOW_DEFAULT,
    },
    borderRadius,
  };
};

export const StyledCardRoot = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $layout: CardLayout;
  $variant: CardVariant;
  $cardStyle?: CardStyle;
  $isDisabled: boolean;
}>(({ theme, $layout, $variant, $cardStyle, $isDisabled }) => {
  const positionStyle = {
    position: "relative" as const,
    zIndex: 0,
  };

  const layoutStyles = getLayoutStyles($layout);
  const { styles: variantStyles } = getVariantStyles(theme, $variant, $cardStyle);

  const gapBaseMap = {
    plate: {
      vertical: 0,
      horizontal: 0,
    },
    post: {
      vertical: 0,
      horizontal: {
        outlined: theme.scheme.semantic.spacing[20],
        empty: theme.scheme.semantic.spacing[24],
      },
    },
  } as const;

  const gapMap = {
    plate: {
      vertical: gapBaseMap.plate.vertical,
      horizontal: gapBaseMap.plate.horizontal,
    },
    post: {
      vertical: gapBaseMap.post.vertical,
      horizontal: gapBaseMap.post.horizontal[$cardStyle || "outlined"],
    },
  };

  const gap = gapMap[$variant][$layout];

  const baseStyles: CSSObject = {
    ...positionStyle,
    display: "flex",
    gap,
    ...layoutStyles,
    ...variantStyles,
    width: "100%",
    height: "100%",
    "--card-title-color": $isDisabled
      ? theme.color.semantic.object.subtle
      : theme.color.semantic.object.bolder,
    "--card-label-color": $isDisabled
      ? theme.color.semantic.object.subtle
      : theme.color.semantic.object.neutral,
    "--card-body-color": $isDisabled
      ? theme.color.semantic.object.subtle
      : theme.color.semantic.object.normal,
    "--card-caption-color": $isDisabled
      ? theme.color.semantic.object.subtle
      : theme.color.semantic.object.alternative,
  };

  const hasShadowOnRoot = !($variant === "post" && $cardStyle === "empty");

  return {
    ...baseStyles,
    '&[data-interactive="true"]': {
      transition: `transform ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}${hasShadowOnRoot ? `, box-shadow ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}` : ""}`,
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
}>(({ $layout, $variant }) => {
  const borderRadiusMap = {
    vertical: {
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    horizontal: {
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: 0,
      borderBottomLeftRadius: "inherit",
      borderBottomRightRadius: 0,
    },
  } as const;

  const sizeMap = {
    plate: {
      vertical: {
        width: "100%",
      },
      horizontal: {
        height: "100%",
        alignSelf: "stretch",
      },
    },
    post: {
      vertical: {
        width: "100%",
      },
      horizontal: {
        height: "100%",
        alignSelf: "stretch",
      },
    },
  } as const;

  const borderRadius = $variant === "post" ? 0 : borderRadiusMap[$layout];

  return {
    flexShrink: 0,
    overflow: "hidden",
    ...(typeof borderRadius === "number" ? {} : borderRadius),
    ...sizeMap[$variant][$layout],
  };
});

export const StyledCardContent = styled.div<{
  $variant: CardVariant;
  $layout: CardLayout;
}>(({ theme, $variant, $layout }) => {
  const baseStyles = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start" as const,
    flex: "1 0 0",
  };

  const styleMap = {
    plate: {
      vertical: {
        padding: theme.scheme.semantic.spacing[20],
        gap: theme.scheme.semantic.spacing[16],
        alignSelf: "stretch" as const,
        borderTop: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
      },
      horizontal: {
        padding: theme.scheme.semantic.spacing[20],
        gap: theme.scheme.semantic.spacing[16],
        alignSelf: "stretch" as const,
        borderLeft: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
      },
    },
    post: {
      vertical: {
        padding: theme.scheme.semantic.spacing[20],
        gap: theme.scheme.semantic.spacing[16],
      },
      horizontal: {
        gap: theme.scheme.semantic.spacing[16],
      },
    },
  };

  return {
    ...baseStyles,
    ...styleMap[$variant][$layout],
  };
});

export const StyledCardMeta = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: 0,
  alignSelf: "stretch",
  gap: theme.scheme.semantic.spacing[16],
  [theme.breakPoint.tablet]: {
    gap: theme.scheme.semantic.spacing[16],
  },
  [theme.breakPoint.mobile]: {
    gap: theme.scheme.semantic.spacing[16],
  },
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
  //Todo: Title에는 weight가 존재하지 않음, 수정된 토큰명으로 변경 필요
  ...createLabelStyles(theme, { size: "lg", weight: "normal" }),
  color: "var(--card-title-color)",
  margin: 0,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  alignSelf: "stretch",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const StyledCardLabel = styled("h4", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: "lg", weight: "bold" }),
  color: "var(--card-label-color)",
  margin: 0,
  alignSelf: "stretch",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const StyledCardBody = styled("p", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: "sm", weight: "normal" }),
  color: "var(--card-body-color)",
  margin: 0,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  alignSelf: "stretch",
  overflow: "hidden",
}));

export const StyledCardCaption = styled("span", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: "xs", weight: "subtle" }),
  color: "var(--card-caption-color)",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const StyledCardOverlay = styled("a", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $variant: CardVariant;
  $cardStyle?: CardStyle;
}>(({ theme, $variant, $cardStyle }) => {
  const offsetMap = {
    plate: {
      vertical: 0,
      horizontal: 0,
    },
    post: {
      outlined: {
        vertical: 0,
        horizontal: 0,
      },
      empty: {
        vertical: 12,
        horizontal: 12,
      },
    },
  } as const;

  const offset = $variant === "plate" ? offsetMap.plate : offsetMap.post[$cardStyle || "outlined"];

  const borderRadiusMap = {
    plate: 12,
    post: {
      outlined: 10,
      empty: 10,
    },
  } as const;

  const borderRadius =
    $variant === "plate" ? borderRadiusMap.plate : borderRadiusMap.post[$cardStyle || "outlined"];

  const interactionParams = {
    rest: InteractionLayer({
      theme,
      state: "rest",
      variant: "normal",
      density: "assistive",
      fillColor: "default",
      isDisabled: false,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius,
    }),
    hover: InteractionLayer({
      theme,
      state: "hover",
      variant: "normal",
      density: "assistive",
      fillColor: "default",
      isDisabled: false,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius,
    }),
    active: InteractionLayer({
      theme,
      state: "active",
      variant: "normal",
      density: "assistive",
      fillColor: "default",
      isDisabled: false,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius,
    }),
    focus: InteractionLayer({
      theme,
      state: "focus",
      variant: "normal",
      density: "assistive",
      fillColor: "default",
      isDisabled: false,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius,
    }),
  };

  const hasVerticalOffset = offset.vertical > 0;
  const hasHorizontalOffset = offset.horizontal > 0;
  const hasOffset = hasVerticalOffset || hasHorizontalOffset;

  const hasShadowOnOverlay = $variant === "post" && $cardStyle === "empty";

  return {
    position: "absolute" as const,
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
        ? {
            ...shadow(theme, "raised"),
          }
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
