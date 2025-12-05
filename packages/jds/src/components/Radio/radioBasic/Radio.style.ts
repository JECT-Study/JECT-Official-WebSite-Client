import styled from "@emotion/styled";
import { interaction, pxToRem } from "utils";

import type { RadioSize, RadioStyledProps } from "./radio.types";

const RADIO_SIZE: Record<
  RadioSize,
  {
    radioSize: number;
    border: string;
  }
> = {
  lg: {
    radioSize: 20,
    border: "6",
  },
  md: {
    radioSize: 18,
    border: "5",
  },
  sm: {
    radioSize: 16,
    border: "5",
  },
  xs: {
    radioSize: 14,
    border: "4",
  },
};

export const RadioLabel = styled.label<RadioStyledProps>(({ theme, radioSize }) => {
  const borderSize = RADIO_SIZE[radioSize]
    .border as keyof typeof theme.scheme.semantic.strokeWeight;

  return {
    display: "inline-flex",
    position: "relative",

    [`input[type="radio"]:not(:disabled):checked + .visual`]: {
      backgroundColor: theme.color.semantic.surface.static.standard,
      border: `${theme.scheme.semantic.strokeWeight[borderSize]} solid ${theme.color.semantic.accent.neutral}`,
    },

    [`input[type="radio"]:not(:checked):disabled + .visual`]: {
      backgroundColor: theme.color.semantic.surface.standard,
      borderColor: theme.color.semantic.stroke.alpha.subtler,
      cursor: "default",
      ...interaction(theme, "normal", "normal", "default", "disabled"),
    },

    [`input[type="radio"]:checked:disabled + .visual`]: {
      backgroundColor: theme.color.semantic.fill.subtle,
      border: `${theme.scheme.semantic.strokeWeight[borderSize]} solid ${theme.color.semantic.stroke.subtler}`,
      cursor: "default",
      ...interaction(theme, "normal", "normal", "default", "disabled"),
    },

    [`input[type="radio"]:focus-visible + .visual`]: {
      boxShadow: `0 0 0 3px ${theme.color.semantic.interaction.focus}`,
    },
  };
});

export const RadioInput = styled.input({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  border: 0,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
});

export const RadioSpan = styled.span<RadioStyledProps>(({ theme, radioSize }) => {
  const sizeValue = pxToRem(RADIO_SIZE[radioSize].radioSize);

  return {
    borderRadius: theme.scheme.semantic.radius.max,
    width: sizeValue,
    height: sizeValue,
    border: `1px solid ${theme.color.semantic.stroke.alpha.assistive}`,
    backgroundColor: theme.color.semantic.surface.shallow,
    cursor: "pointer",
    ...interaction(theme, "normal", "normal", "default"),
  };
});
