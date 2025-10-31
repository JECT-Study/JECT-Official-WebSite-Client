import styled from '@emotion/styled';
import { pxToRem, shadow, textStyle } from 'utils';
import { Icon, Label } from '@/components';
import { toastStylesMap } from './toast.variants';
import { ToastDivProps, ToastFeedbackIconProps, ToastStyle } from './toast.types';
import { keyframes } from '@emotion/react';

export const ToastStackContainer = styled.div(({ theme }) => {
  return {
    position: 'absolute',
    bottom: '0',
    right: '0',
    padding: '40px',
    zIndex: 9999,
    [theme.breakPoint.tablet]: { padding: '40px' },
    [theme.breakPoint.mobile]: { padding: '24px', right: '50%', transform: 'translate(50%, 0)' },
    display: 'flex',
    flexDirection: 'column-reverse',
    gap: pxToRem(16),
    overflow: 'hidden',
  };
});

export const ToastDiv = styled.div<ToastDivProps>(({ theme, toastStyle }) => {
  const color = toastStylesMap(theme)[toastStyle].color;
  const borderColor = toastStylesMap(theme)[toastStyle].borderColor;
  const backgroundColor = toastStylesMap(theme)[toastStyle].backgroundColor;
  const entryDuration = theme.environment.duration[250];
  const exitDuration = theme.environment.duration[250];
  const delayDuration = 3000;
  const animationDuration = entryDuration + delayDuration + exitDuration;
  const animationMotion = theme.environment.motion.bouncy;

  const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
        
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

  const slideInOut = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  ${(entryDuration / animationDuration) * 100}% {
    opacity: 1;
    transform: translateY(0);
  }
  ${(1 - exitDuration / animationDuration) * 100}% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
`;

  return {
    display: 'flex',
    flexDirection: 'column',
    gap: pxToRem(theme.scheme.desktop.spacing[16]),
    width: pxToRem(300),
    minHeight: pxToRem(55),
    padding: `16px 20px`,
    border: `${theme.scheme.desktop.stroke.weight[1]}px solid ${borderColor}`,
    borderRadius: `${theme.scheme.desktop.radius[10]}px`,
    backgroundColor: theme.color.semantic.surface.shallow,
    color,
    ...shadow(theme, 'desktop', 'overlay'),

    position: 'relative',
    '::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      backgroundColor,
      opacity: `${theme.scheme.desktop.opacity[36]}%`,
      zIndex: '-10',
    },

    '&.delete': {
      animation: `${slideOut} ${exitDuration}ms ${animationMotion} forwards`,
    },

    animation: `${slideInOut} ${animationDuration}ms ${animationMotion} forwards`,
  };
});

export const ToastLabel = styled(Label)<{ toastStyle: ToastStyle }>(({ theme, toastStyle }) => {
  return { flex: '1', color: toastStylesMap(theme)[toastStyle].color };
});

export const ToastContentDiv = styled.div(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: pxToRem(theme.scheme.desktop.spacing[6]),
  };
});

export const ToastLabelContainerDiv = styled.div(({ theme }) => {
  return {
    display: 'flex',
    gap: pxToRem(theme.scheme.desktop.spacing[8]),
    justifyContent: 'space-between',
    alignItems: 'center',
  };
});

export const ToastCaptionP = styled.p(({ theme }) => {
  return {
    ...textStyle(theme, 'desktop', 'body.xs.normal'),
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', 'body.xs.normal') },
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', 'body.xs.normal') },
  };
});

export const ButtonContainerDiv = styled.div(({ theme }) => {
  return {
    display: 'flex',
    gap: pxToRem(theme.scheme.desktop.spacing[12]),
    justifyContent: 'flex-start',
    alignItems: 'center',
  };
});

export const ToastFeedbackIcon = styled(Icon)<ToastFeedbackIconProps>(({ theme, feedback }) => {
  return { color: toastStylesMap(theme)[feedback].color };
});
