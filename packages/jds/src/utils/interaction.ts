import type { Theme } from "@emotion/react";
import type { CSSObject } from "@emotion/react";
import type { Density, FillColor, InteractionState, Variant } from "types";

interface InteractionStyles extends CSSObject {
  "::after"?: CSSObject;
  "&:hover::after"?: CSSObject;
  "&:active::after"?: CSSObject;
  "&:focus-visible"?: CSSObject;
}

export function interaction(
  theme: Theme,
  variant: Variant,
  density: Density,
  fillColor: FillColor,
  state: InteractionState = "default",
  borderRadius: string = "inherit",
): InteractionStyles {
  const createAfter = (backgroundColor: string): InteractionStyles => {
    const baseStyle = {
      position: "relative" as const,
      outline: "none" as const,
    };

    const afterBaseStyle = {
      content: '""',
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: backgroundColor,
      borderRadius,
    };

    if (state === "locked") {
      return {
        ...baseStyle,
        "::after": { ...afterBaseStyle, opacity: 0.08 },
      };
    }

    if (state === "disabled") {
      return {
        ...baseStyle,
        "::after": { ...afterBaseStyle, opacity: 0.05 },
      };
    }

    if (state === "readonly") {
      return {
        ...baseStyle,
        "::after": { ...afterBaseStyle, opacity: 0 },
      };
    }

    return {
      ...baseStyle,
      "::after": { ...afterBaseStyle, opacity: 0 },
      "&:hover::after": { opacity: 0.08 },
      "&:active::after": { opacity: 0.12 },
      "&:focus-visible": { boxShadow: `0 0 0 3px ${theme.color.semantic.interaction.focus}` },
    };
  };

  if (fillColor === "default") {
    if (variant === "normal") {
      if (density === "bold") return createAfter(theme.color.semantic.interaction.bold);
      if (density === "normal") return createAfter(theme.color.semantic.interaction.normal);
      if (density === "assistive") return createAfter(theme.color.semantic.interaction.assistive);
      if (density === "subtle") return createAfter(theme.color.semantic.interaction.subtle);
    } else if (variant === "accent") {
      if (density === "bold") return createAfter(theme.color.semantic.accent.bold);
      if (density === "normal") return createAfter(theme.color.semantic.accent.normal);
      if (density === "assistive") return createAfter(theme.color.semantic.accent.neutral);
      if (density === "subtle") return createAfter(theme.color.semantic.accent.alternative);
    } else if (variant === "positive") {
      if (density === "bold") return createAfter(theme.color.semantic.feedback.positive.bold);
      if (density === "normal") return createAfter(theme.color.semantic.feedback.positive.normal);
      if (density === "assistive")
        return createAfter(theme.color.semantic.feedback.positive.neutral);
      if (density === "subtle")
        return createAfter(theme.color.semantic.feedback.positive.alternative);
    } else if (variant === "destructive") {
      if (density === "bold") return createAfter(theme.color.semantic.feedback.destructive.bold);
      if (density === "normal")
        return createAfter(theme.color.semantic.feedback.destructive.normal);
      if (density === "assistive")
        return createAfter(theme.color.semantic.feedback.destructive.neutral);
      if (density === "subtle")
        return createAfter(theme.color.semantic.feedback.destructive.alternative);
    }
  } else if (fillColor === "inverse") {
    if (variant === "normal") {
      if (density === "bold") return createAfter(theme.color.semantic.interaction.inverse.bold);
      if (density === "normal") return createAfter(theme.color.semantic.interaction.inverse.normal);
      if (density === "assistive")
        return createAfter(theme.color.semantic.interaction.inverse.assistive);
      if (density === "subtle") return createAfter(theme.color.semantic.interaction.inverse.subtle);
    } else if (variant === "accent") {
      if (density === "bold") return createAfter(theme.color.semantic.accent.inverse.bold);
      if (density === "normal") return createAfter(theme.color.semantic.accent.inverse.normal);
      if (density === "assistive") return createAfter(theme.color.semantic.accent.inverse.neutral);
      if (density === "subtle") return createAfter(theme.color.semantic.accent.inverse.alternative);
    } else if (variant === "positive") {
      if (density === "bold")
        return createAfter(theme.color.semantic.feedback.positive.inverse.bold);
      if (density === "normal")
        return createAfter(theme.color.semantic.feedback.positive.inverse.normal);
      if (density === "assistive")
        return createAfter(theme.color.semantic.feedback.positive.inverse.neutral);
      if (density === "subtle")
        return createAfter(theme.color.semantic.feedback.positive.inverse.alternative);
    } else if (variant === "destructive") {
      if (density === "bold")
        return createAfter(theme.color.semantic.feedback.destructive.inverse.bold);
      if (density === "normal")
        return createAfter(theme.color.semantic.feedback.destructive.inverse.normal);
      if (density === "assistive")
        return createAfter(theme.color.semantic.feedback.destructive.inverse.neutral);
      if (density === "subtle")
        return createAfter(theme.color.semantic.feedback.destructive.inverse.alternative);
    }
  }

  return {};
}
