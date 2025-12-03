import styled from "@emotion/styled";
import { pxToRem } from "utils";

import type { BadgeSize, FeedbackVariant } from "../badge.types";
import { dotBadgeSizeMap } from "../badge.variants";
import { dotBadgeFeedbackStylesMap, dotBadgeFeedbackMutedStylesMap } from "./dotBadge.variants";

interface DotBadgeFeedbackDivProps {
  variant: FeedbackVariant;
  size: BadgeSize;
  isMuted: boolean;
}

export const DotBadgeFeedbackDiv = styled.div<DotBadgeFeedbackDivProps>(
  ({ theme, variant, size, isMuted }) => {
    const backgroundColor = isMuted
      ? dotBadgeFeedbackMutedStylesMap(theme)[variant].bg
      : dotBadgeFeedbackStylesMap(theme)[variant].bg;

    return {
      width: pxToRem(dotBadgeSizeMap[size].width),
      height: pxToRem(dotBadgeSizeMap[size].height),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      aspectRatio: "1/1",
      backgroundColor,
      borderRadius: theme.scheme.semantic.radius.max,
    };
  },
);
