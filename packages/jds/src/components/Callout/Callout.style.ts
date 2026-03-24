import styled from "@emotion/styled";
import { pxToRem } from "utils";

import type { CalloutContainerProps, CalloutTextProps } from "./Callout.types";
import { calloutContentSizeMap, calloutSizeMap } from "./Callout.variants";

export const CalloutContainer = styled.div<CalloutContainerProps>(
  ({ theme, $size, $styleToken }) => {
    const sizeVar = calloutSizeMap[$size];

    return {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: `${pxToRem(sizeVar.paddingY)} ${pxToRem(sizeVar.paddingX)}`,
      gap: pxToRem(sizeVar.gap),
      borderRadius: theme.scheme.semantic.radius[6],
      backgroundColor: $styleToken.bg,
      color: $styleToken.color,
      border: `1px solid ${$styleToken.border}`,
      borderLeft: `1px solid ${$styleToken.border}`,
    };
  },
);

export const CalloutContentDiv = styled.div<CalloutTextProps>(({ $size }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: calloutContentSizeMap[$size].gap,
  };
});

export const CalloutTitleP = styled.p<CalloutTextProps>(({ theme, $size }) => {
  const tokenKey = calloutContentSizeMap[$size].title;
  const textStyle = theme.textStyle[tokenKey as keyof typeof theme.textStyle];

  return {
    margin: 0,
    ...textStyle,
  };
});

export const CalloutContentP = styled.p<CalloutTextProps>(({ theme, $size }) => {
  const tokenKey = calloutContentSizeMap[$size].content;
  const textStyle = theme.textStyle[tokenKey as keyof typeof theme.textStyle];

  return {
    margin: 0,
    ...textStyle,
  };
});
