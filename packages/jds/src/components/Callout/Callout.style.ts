import styled from "@emotion/styled";
import { pxToRem } from "utils";

import type { CalloutBasicDivProps, CalloutFeedbackDivProps, CalloutPProps } from "./Callout.types";
import {
  calloutBasicStylesMap,
  calloutFeedbackStylesMap,
  calloutSizeMap,
} from "./Callout.variants";

export const CalloutBasicDiv = styled.div<CalloutBasicDivProps>(
  ({ theme, hierarchy, variant, size }) => {
    const style = calloutBasicStylesMap(theme)[variant][hierarchy];
    const border = variant === "hero" ? "none" : `1px solid ${style.border}`;
    const borderLeft =
      variant === "hero" ? `6px solid ${style.border}` : `1px solid ${style.border}`;
    const borderRadius = variant === "hero" ? "none" : theme.scheme.semantic.radius[6];

    return {
      width: pxToRem(300),
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: `${pxToRem(calloutSizeMap[size].paddingTopBottom)} ${pxToRem(calloutSizeMap[size].paddingLeftRight)}`,
      gap: pxToRem(calloutSizeMap[size].gap),
      border,
      borderLeft,
      borderRadius,
      backgroundColor: style.bg,
      color: style.color,
    };
  },
);

export const CalloutFeedbackDiv = styled.div<CalloutFeedbackDivProps>(
  ({ theme, hierarchy, variant, size }) => {
    const style = calloutFeedbackStylesMap(theme)[variant][hierarchy];
    const border = variant === "hero" ? "none" : `1px solid ${style.border}`;
    const borderLeft =
      variant === "hero" ? `6px solid ${style.border}` : `1px solid ${style.border}`;
    const borderRadius = variant === "hero" ? "none" : theme.scheme.semantic.radius[6];

    return {
      width: pxToRem(300),
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: `${pxToRem(calloutSizeMap[size].paddingTopBottom)} ${pxToRem(calloutSizeMap[size].paddingLeftRight)}`,
      gap: pxToRem(calloutSizeMap[size].gap),
      border,
      borderLeft,
      borderRadius,
      backgroundColor: style.bg,
      color: style.color,
    };
  },
);

export const CalloutTitleP = styled.p<CalloutPProps>(({ theme, size }) => {
  const tokenKey = calloutSizeMap[size].title;
  return theme.textStyle[tokenKey];
});

export const CalloutContentP = styled.p<CalloutPProps>(({ theme, size }) => {
  const tokenKey = calloutSizeMap[size].content;
  return theme.textStyle[tokenKey];
});
