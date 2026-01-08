import styled from "@emotion/styled";
import { Interaction, pxToRem } from "utils";

import type { RadioSize, RadioStyledProps, StyledLabelProps } from "./radio.types";

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

export const StyledRadioRootLabel = styled.label<RadioStyledProps>(({ theme, radioSize }) => {
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
      ...Interaction(theme, "normal", "normal", "default", "disabled"),
    },

    [`input[type="radio"]:checked:disabled + .visual`]: {
      backgroundColor: theme.color.semantic.fill.subtle,
      border: `${theme.scheme.semantic.strokeWeight[borderSize]} solid ${theme.color.semantic.stroke.subtler}`,
      cursor: "default",
      ...Interaction(theme, "normal", "normal", "default", "disabled"),
    },

    [`input[type="radio"]:focus-visible + .visual`]: {
      boxShadow: `0 0 0 3px ${theme.color.semantic.interaction.focus}`,
    },
  };
});

export const StyledRadioRootInput = styled.input({
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

export const StyledRadioRootSpan = styled.span<RadioStyledProps>(({ theme, radioSize }) => {
  const sizeValue = pxToRem(RADIO_SIZE[radioSize].radioSize);

  return {
    borderRadius: theme.scheme.semantic.radius.max,
    width: sizeValue,
    height: sizeValue,
    border: `1px solid ${theme.color.semantic.stroke.alpha.assistive}`,
    backgroundColor: theme.color.semantic.surface.shallow,
    cursor: "pointer",
    ...Interaction(theme, "normal", "normal", "default"),
  };
});

import type { LabelSize } from "@/components/Label/Label.style";

interface RadioContainerProps {
  radioSize: RadioSize;
  isDisabled: boolean;
  isAlignRight: boolean;
  isStyleOutline: boolean;
}

export const radioContainerSizeMap: Record<
  RadioSize,
  {
    width: number;
    height: number;
    gap: string;
    padding: string;
    borderRadius: string;
  }
> = {
  lg: {
    width: 13,
    height: 8,
    gap: "12",
    padding: "12",
    borderRadius: "6",
  },
  md: {
    width: 13,
    height: 8,
    gap: "10",
    padding: "10",
    borderRadius: "6",
  },
  sm: {
    width: 11,
    height: 6,
    gap: "8",
    padding: "8",
    borderRadius: "4",
  },
  xs: {
    width: 9,
    height: 6,
    gap: "8",
    padding: "6",
    borderRadius: "4",
  },
};

export const subLabelSizeMap: Record<RadioSize, LabelSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
  xs: "xs",
};

export const StyledRadioRoot = styled.div<RadioContainerProps>(
  ({ theme, radioSize, isDisabled, isAlignRight, isStyleOutline }) => {
    const rowGap = radioContainerSizeMap[radioSize]
      .gap as keyof typeof theme.scheme.semantic.spacing;
    const padding = radioContainerSizeMap[radioSize]
      .padding as keyof typeof theme.scheme.semantic.spacing;
    const borderRadius = radioContainerSizeMap[radioSize]
      .borderRadius as keyof typeof theme.scheme.semantic.radius;
    const interactionWidth = radioContainerSizeMap[radioSize].width;
    const interactionHeight = radioContainerSizeMap[radioSize].height;
    const borderColor = isDisabled
      ? theme.color.semantic.stroke.alpha.subtler
      : theme.color.semantic.stroke.alpha.subtle;
    const checkedInteraction = Interaction(
      theme,
      "accent",
      "assistive",
      "default",
      isDisabled ? "readonly" : "default",
    );
    const nonCheckedInteraction = Interaction(
      theme,
      "normal",
      "normal",
      "default",
      isDisabled ? "readonly" : "default",
    );
    const addonInteraction = isStyleOutline
      ? {
          border: "inherit",
        }
      : {
          width: `calc(100% + ${interactionWidth}px)`,
          height: `calc(100% + ${interactionHeight}px)`,
          transform: `translate(-${Math.floor(interactionWidth / 2) + 1}px , -${Math.floor(interactionHeight / 2)}px)`,
        };

    return {
      display: "inline-grid",
      gridTemplateColumns: "auto 1fr",
      alignItems: "center",
      "& > :nth-child(1)": {
        gridColumn: 1,
        gridRow: 1,
        display: "flex",
        alignItems: "center",
      },
      "& > :nth-child(2)": {
        gridColumn: 2,
        gridRow: 1,
        display: "flex",
        alignItems: "center",
      },
      "& > :nth-child(3)": {
        gridColumn: isAlignRight ? "1 / span 2" : 2,
        gridRow: 2,
      },

      gap: `${theme.scheme.semantic.spacing[6]} ${theme.scheme.semantic.spacing[rowGap]} `,
      border: isStyleOutline ? `1px solid ${borderColor}` : "none",
      borderRadius: theme.scheme.semantic.radius[borderRadius],
      padding: isStyleOutline ? theme.scheme.semantic.spacing[padding] : "0",
      ...nonCheckedInteraction,

      "::after": {
        ...nonCheckedInteraction["::after"],
        ...addonInteraction,
        transition: `all ${theme.environment.semantic.duration[100]}ms ${theme.environment.semantic.motion.fluent}`,
        pointerEvents: "none" as const,
      },

      "&:active::after": {
        transition: "none",
      },

      '&:has(input[type="radio"]:checked)': {
        ...checkedInteraction,
        "::after": {
          ...checkedInteraction["::after"],
          ...addonInteraction,
          pointerEvents: "none" as const,
        },
      },

      '&:has(input[type="radio"]:focus-visible)::before': {
        ...addonInteraction,
        boxShadow: `0 0 0 3px ${theme.color.semantic.interaction.focus}`,
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: theme.scheme.semantic.radius[borderRadius],
      },

      'input[type="radio"]:focus-visible + .visual': {
        boxShadow: "none !important",
      },
    };
  },
);

export const StyledLabel = styled("div")<StyledLabelProps>(({ theme, $size, $isDisabled }) => {
  return {
    ...theme.textStyle[`semantic-textStyle-label-${$size}-subtle`],
    color: $isDisabled ? theme.color.semantic.object.subtle : theme.color.semantic.object.bold,
  };
});

export const StyledSubLabel = styled("div")<StyledLabelProps>(({ theme, $size, $isDisabled }) => {
  return {
    ...theme.textStyle[`semantic-textStyle-label-${subLabelSizeMap[$size]}-subtle`],
    color: $isDisabled ? theme.color.semantic.object.subtle : theme.color.semantic.object.bold,
    position: "relative",
    zIndex: 10,
  };
});
