import styled from "@emotion/styled";
import { interaction } from "utils";

import type { RadioSize, StyledLabelProps } from "./radioContent.types";

import { Label } from "@/components/Label";
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

export const RadioContainerLabel = styled.label<RadioContainerProps>(
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
    const checkedInteraction = interaction(
      theme,
      "accent",
      "assistive",
      "default",
      isDisabled ? "readonly" : "default",
    );
    const nonCheckedInteraction = interaction(
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
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      "& > :nth-child(1)": {
        gridColumn: 1,
        gridRow: 1,
        justifyItems: "center",
        alignItems: "center",
      },
      "& > :nth-child(2)": {
        gridColumn: 2,
        gridRow: 1,
        justifyItems: "center",
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
      },

      "&:active::after": {
        transition: "none",
      },

      '&:has(input[type="radio"]:checked)': {
        ...checkedInteraction,
        "::after": {
          ...checkedInteraction["::after"],
          ...addonInteraction,
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
  };
});

// export const StyledSubLabel = styled(Label)<StyledLabelProps>(({ theme, $isDisabled }) => ({
//   color: $isDisabled ? theme.color.semantic.object.subtle : theme.color.semantic.object.assistive,
// }));
