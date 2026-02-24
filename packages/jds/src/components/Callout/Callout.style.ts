import styled from "@emotion/styled";
import { pxToRem } from "utils";

import type { CalloutBasicDivProps, CalloutFeedbackDivProps, CalloutPProps } from "./Callout.types";
import {
  calloutBasicStylesMap,
  calloutContentSizeMap,
  calloutFeedbackStylesMap,
  calloutSizeMap,
} from "./Callout.variants";

const getAfterBorderStyle = (borderColor: string, backgroundColor: string) => ({
  "&::after": {
    content: '""',
    position: "absolute" as const,
    inset: 0,
    border: `1px solid ${borderColor}`,
    borderRadius: "inherit",
    pointerEvents: "none" as const,
    backgroundColor: backgroundColor,
  },
});

export const CalloutBasicDiv = styled.div<CalloutBasicDivProps>(({ theme, hierarchy, size }) => {
  const style = calloutBasicStylesMap(theme)[hierarchy];
  const borderRadius = theme.scheme.semantic.radius[6];

  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: `${pxToRem(calloutSizeMap[size].paddingTopBottom)} ${pxToRem(calloutSizeMap[size].paddingLeftRight)}`,
    gap: pxToRem(calloutSizeMap[size].gap),
    borderRadius: borderRadius,
    color: style.color,
    ...getAfterBorderStyle(style.border, style.bg),
  };
});

export const CalloutFeedbackDiv = styled.div<CalloutFeedbackDivProps>(
  ({ theme, hierarchy, size }) => {
    const style = calloutFeedbackStylesMap(theme)[hierarchy];
    const borderRadius = theme.scheme.semantic.radius[6];

    return {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: `${pxToRem(calloutSizeMap[size].paddingTopBottom)} ${pxToRem(calloutSizeMap[size].paddingLeftRight)}`,
      gap: pxToRem(calloutSizeMap[size].gap),
      borderRadius: borderRadius,
      backgroundColor: style.bg,
      color: style.color,
      ...getAfterBorderStyle(style.border, style.bg),
    };
  },
);

export const CalloutContentDiv = styled.div<CalloutPProps>(({ size }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: calloutContentSizeMap[size].gap,
  };
});

export const CalloutTitleP = styled.p<CalloutPProps>(({ theme, size }) => {
  const tokenKey = calloutContentSizeMap[size].title;
  return { margin: theme.scheme.semantic.spacing[0], ...theme.textStyle[tokenKey] };
});

export const CalloutContentP = styled.p<CalloutPProps>(({ theme, size }) => {
  const tokenKey = calloutContentSizeMap[size].content;
  return { margin: theme.scheme.semantic.spacing[0], ...theme.textStyle[tokenKey] };
});
