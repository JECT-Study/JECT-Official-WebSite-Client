import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { pxToRem, shadow } from "utils";

import type { ToastDivProps, ToastFeedbackIconProps, ToastStyle } from "./toast.types";
import { toastStylesMap } from "./toast.variants";

import { Icon } from "../Icon";
import { Label } from "../Label";

export const ToastStackContainer = styled.div(({ theme }) => {
  return {
    position: "absolute",
    bottom: "0",
    right: "0",
    padding: "40px",
    zIndex: 9999,
    [theme.breakPoint.tablet]: { padding: "40px" },
    [theme.breakPoint.mobile]: { padding: "24px", right: "50%", transform: "translate(50%, 0)" },
    display: "flex",
    flexDirection: "column-reverse",
    gap: pxToRem(16),
    overflow: "hidden",
  };
});

export const ToastDiv = styled.div<ToastDivProps>(({ theme, toastStyle }) => {
  const color = toastStylesMap(theme)[toastStyle].color;
  const borderColor = toastStylesMap(theme)[toastStyle].borderColor;
  const backgroundColor = toastStylesMap(theme)[toastStyle].backgroundColor;

  const slideIn = keyframes`
    from { opacity: 0; transform: translateY(100%); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const slideOut = keyframes`
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(100%); }
`;

  return {
    display: "flex",
    flexDirection: "column",
    gap: theme.scheme.semantic.spacing[16],
    width: pxToRem(300),
    padding: `16px 20px`,
    border: `1px solid ${borderColor}`,
    borderRadius: theme.scheme.semantic.radius[10],
    backgroundColor: theme.color.semantic.surface.shallow,
    color,
    ...shadow(theme, "overlay"),

    position: "relative",
    "::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      backgroundColor,
      opacity: 0.36,
      zIndex: "-10",
    },

    "&.enter": {
      animation: `${slideIn} ${theme.environment.semantic.duration[250]} ${theme.environment.semantic.motion.bouncy} forwards`,
    },

    "&.static": {
      animation: "none",
    },

    "&.exit": {
      animation: `${slideOut} ${theme.environment.semantic.duration[250]} ${theme.environment.semantic.motion.bouncy} forwards`,
    },
  };
});

export const ToastLabel = styled(Label)<{ toastStyle: ToastStyle }>(({ theme, toastStyle }) => {
  return { flex: "1", color: toastStylesMap(theme)[toastStyle].color };
});

export const ToastContentDiv = styled.div(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: theme.scheme.semantic.spacing[6],
  };
});

export const ToastLabelContainerDiv = styled.div(({ theme }) => {
  return {
    display: "flex",
    gap: theme.scheme.semantic.spacing[8],
    justifyContent: "space-between",
    alignItems: "center",
  };
});

export const ToastCaptionP = styled.p(({ theme }) => {
  return {
    ...theme.textStyle["semantic-textStyle-body-xs-normal"],
    [theme.breakPoint.mobile]: { ...theme.textStyle["semantic-textStyle-body-xs-normal"] },
    [theme.breakPoint.tablet]: { ...theme.textStyle["semantic-textStyle-body-xs-normal"] },
  };
});

export const ButtonContainerDiv = styled.div(({ theme }) => {
  return {
    display: "flex",
    gap: theme.scheme.semantic.spacing[12],
    justifyContent: "flex-start",
    alignItems: "center",
  };
});

export const ToastFeedbackIcon = styled(Icon)<ToastFeedbackIconProps>(({ theme, variant }) => {
  return { color: toastStylesMap(theme)[variant].color };
});
