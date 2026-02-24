import styled from "@emotion/styled";
import { pxToRem } from "utils";

import type { CalloutBasicDivProps, CalloutFeedbackDivProps, CalloutPProps } from "./Callout.types";
import {
  calloutBasicStylesMap,
  calloutFeedbackStylesMap,
  calloutSizeMap,
} from "./Callout.variants";

export const CalloutBasicDiv = styled.div<CalloutBasicDivProps>(({ theme, hierarchy, size }) => {
  const style = calloutBasicStylesMap(theme)[hierarchy];

  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: `${pxToRem(calloutSizeMap[size].paddingTopBottom)} ${pxToRem(calloutSizeMap[size].paddingLeftRight)}`,
    gap: pxToRem(calloutSizeMap[size].gap),
    border: `1px solid ${style.border}`,
    borderLeft: `1px solid ${style.border}`,
    borderRadius: theme.scheme.semantic.radius[6],
    backgroundColor: style.bg,
    color: style.color,
  };
});

export const CalloutFeedbackDiv = styled.div<CalloutFeedbackDivProps>(
  ({ theme, hierarchy, size }) => {
    const style = calloutFeedbackStylesMap(theme)[hierarchy];
    return {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: `${pxToRem(calloutSizeMap[size].paddingTopBottom)} ${pxToRem(calloutSizeMap[size].paddingLeftRight)}`,
      gap: pxToRem(calloutSizeMap[size].gap),
      border: `1px solid ${style.border}`,
      borderLeft: `1px solid ${style.border}`,
      borderRadius: theme.scheme.semantic.radius[6],
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
