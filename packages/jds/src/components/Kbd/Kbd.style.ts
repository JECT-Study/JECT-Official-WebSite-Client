import isPropValid from "@emotion/is-prop-valid";
import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { pxToRem } from "utils";

import type { KbdSize, KbdStyleProps, KbdType } from "./Kbd.types";
import { kbdSizeMap, typographyMap } from "./Kbd.variants";

export const getKbdTypography = (type: KbdType, size: KbdSize) => {
  return typographyMap[type][size];
};

export const getKbdStyles = (theme: Theme, isMuted: boolean) => {
  if (isMuted) {
    return {
      border: theme.color.semantic.stroke.alpha.subtler,
      color: theme.color.semantic.object.subtle,
    };
  }

  return {
    border: theme.color.semantic.stroke.alpha.subtle,
    color: theme.color.semantic.object.alternative,
  };
};

export const StyledKbd = styled("kbd", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<KbdStyleProps>(({ theme, $size, $type, $isMuted }) => {
  const kbdSize = kbdSizeMap[$size];
  const kbdStyles = getKbdStyles(theme, $isMuted);
  const kbdTypography = getKbdTypography($type, $size);

  const textStyle = theme.textStyle[kbdTypography as keyof typeof theme.textStyle];

  return {
    boxSizing: "initial",

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    height: pxToRem(kbdSize.height),
    minWidth: pxToRem(kbdSize.minWidth),

    padding: `0 ${pxToRem(kbdSize.paddingX)}`,
    paddingTop: theme.scheme.semantic.spacing[1],

    borderRadius: theme.scheme.semantic.radius[4],
    backgroundColor: theme.color.semantic.fill.subtlest,

    color: kbdStyles.color,
    border: `1px solid ${kbdStyles.border}`,

    ...textStyle,
  };
});
