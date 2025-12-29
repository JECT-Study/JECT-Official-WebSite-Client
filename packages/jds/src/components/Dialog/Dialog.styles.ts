import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { pxToRem, shadow } from "utils";

import { Title } from "../Title";

const dialogOverlayFadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const dialogOverlayFadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

const dialogSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 60px));
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const dialogSlideOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 60px));
  }
`;

// TODO: 다이얼로그 사용 케이스에 따른 배경 색상 변경(dim/dimmer) → 디자인 팀 구체화 필요
export const DialogOverlay = styled(DialogPrimitive.Overlay)(({ theme }) => {
  return {
    position: "fixed",
    inset: 0,
    backgroundColor: theme.color.semantic.curtain.dim,
    '&[data-state="open"]': {
      animation: `${dialogOverlayFadeIn} ${theme.environment.semantic.duration[200]} ${theme.environment.semantic.motion.entrance}`,
    },
    '&[data-state="closed"]': {
      animation: `${dialogOverlayFadeOut} ${theme.environment.semantic.duration[300]} ${theme.environment.semantic.motion.leave}`,
    },
  };
});

export const DialogContent = styled(DialogPrimitive.Content)(({ theme }) => {
  return {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 50,
    '&[data-state="open"]': {
      animation: `${dialogSlideIn} ${theme.environment.semantic.duration[200]} ${theme.environment.semantic.motion.entrance}`,
    },
    '&[data-state="closed"]': {
      animation: `${dialogSlideOut} ${theme.environment.semantic.duration[300]} ${theme.environment.semantic.motion.leave}`,
    },
  };
});

export const DialogRoot = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: `calc(100vw - ${pxToRem(32)})`,
  maxWidth: pxToRem(500),
  padding: theme.scheme.semantic.spacing[0],
  gap: theme.scheme.semantic.spacing[0],
  borderRadius: theme.scheme.semantic.radius[12],
  border: `1px solid ${theme.color.semantic.stroke.alpha.subtle}`,
  background: theme.color.semantic.surface.shallow,
  ...shadow(theme, "overlay"),
}));

export const DialogDiv = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  padding: theme.scheme.semantic.margin.md,
  gap: theme.scheme.semantic.spacing[24],
}));

export const DialogContentDiv = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  padding: theme.scheme.semantic.spacing[0],
  gap: theme.scheme.semantic.spacing[16],
}));

export const DialogTitle = styled(Title)({
  alignSelf: "stretch",
});

export const DialogBodyTextP = styled.p(({ theme }) => ({
  alignSelf: "stretch",
  color: theme.color.semantic.object.normal,
  ...theme.textStyle["semantic-textStyle-body-xs-normal"],
}));

export const DialogButtonContainerDiv = styled("div", {
  shouldForwardProp: prop => !prop.startsWith("$"),
})<{
  $isStacked?: boolean;
}>(({ theme, $isStacked }) => ({
  display: "flex",
  flexDirection: $isStacked ? "column" : "row",
  justifyContent: "flex-end",
  alignSelf: "stretch",
  padding: theme.scheme.semantic.spacing[0],
  gap: theme.scheme.semantic.spacing[12],
}));
