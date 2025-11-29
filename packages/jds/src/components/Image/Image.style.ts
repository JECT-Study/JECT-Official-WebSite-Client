import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { interaction, pxToRem } from "utils";

import type { ImgOrientation, ImgRatio } from "./Image";

import { Label } from "../Label";
import { Icon } from "../Icon";

export const getAspectRatioValue = (
  ratio: ImgRatio,
  orientation: ImgOrientation,
): CSSProperties["aspectRatio"] => {
  const [w, h] = ratio.split(":").map(Number);

  if (orientation === "landscape") return `${h} / ${w}`;
  return `${w} / ${h}`;
};

interface ImageButtonProps {
  ratio: ImgRatio;
  orientation: ImgOrientation;
  isReadonly: boolean;
}

export const ImageButton = styled.button<ImageButtonProps>(
  ({ theme, ratio, orientation, isReadonly }) => {
    const interactionStyle = interaction(
      theme,
      "normal",
      "assistive",
      "default",
      isReadonly ? "readonly" : "default",
    );
    return {
      position: "relative",
      width: "100%",
      height: "100%",
      aspectRatio: getAspectRatioValue(ratio, orientation),
      border: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
      borderRadius: "inherit",

      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        borderRadius: "inherit",
      },

      ...interactionStyle,

      "&::after": {
        // ...interactionStyle['::after'],
        width: "calc(100% + 2px)",
        height: "calc(100% + 2px)",
        inset: "-1px",
      },

      "&:hover::after": {
        backgroundColor: theme.color.semantic.curtain.dimmer,
        opacity: isReadonly ? 0 : 1,
        cursor: isReadonly ? "default" : "pointer",
      },

      "&:hover > .hoverIcon": {
        opacity: 1,
      },

      "&:active::after": {},
    };
  },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const IconDiv = styled.div(_ => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 50,
    opacity: 0,
  };
});

export const ImageLabelDiv = styled.div(({ theme }) => {
  return {
    position: "absolute",
    top: "8px",
    left: "8px",
    zIndex: 50,
    minWidth: `${pxToRem(18)}`,
    backgroundColor: theme.color.semantic.object.static.neutral,
    padding: `0 ${theme.scheme.semantic.spacing[2]}`,
    borderRadius: theme.scheme.semantic.radius[2],
  };
});

export const StyledLabel = styled(Label)(({ theme }) => {
  return {
    color: theme.color.semantic.object.static.inverse.boldest,
  };
});

export const StyledIcon = styled(Icon)(({ theme }) => {
  return {
    color: theme.color.semantic.object.static.inverse.boldest,
  };
});
