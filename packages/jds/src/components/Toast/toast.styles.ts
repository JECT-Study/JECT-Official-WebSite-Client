import styled from '@emotion/styled';
import { pxToRem, shadow, textStyle } from 'utils';
import { Icon, Label } from '@/components';
import { toastStylesMap } from './toast.variants';
import { ToastDivProps, ToastFeedbackIconProps } from './toast.types';

export const ToastStackContainer = styled.div(({ theme }) => {
  return {
    position: 'absolute',
    bottom: '40px',
    right: '40px',
    [theme.breakPoint.tablet]: { bottom: '40px', right: '40px' },
    [theme.breakPoint.mobile]: { bottom: '24px', right: '50%', transform: 'translate(50%, 0)' },
    display: 'flex',
    flexDirection: 'column-reverse',
    gap: pxToRem(16),
  };
});

export const ToastDiv = styled.div<ToastDivProps>(({ theme, toastStyle }) => {
  const color = toastStylesMap(theme)[toastStyle].color;
  const borderColor = toastStylesMap(theme)[toastStyle].borderColor;
  const backgroundColor = toastStylesMap(theme)[toastStyle].backgroundColor;

  return {
    display: 'flex',
    flexDirection: 'column',
    gap: pxToRem(theme.scheme.desktop.spacing[16]),
    width: pxToRem(300),
    minHeight: pxToRem(55),
    padding: `16px 20px`,
    border: `${theme.scheme.desktop.stroke.weight[1]}px solid ${borderColor}`,
    borderRadius: `${theme.scheme.desktop.radius[10]}px`,
    backgroundColor,
    color,
    ...shadow(theme, 'desktop', 'overlay'),

    position: 'relative',
    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      backgroundColor: theme.color.surface.shallow,
      zIndex: '-10',
    },
  };
});

export const ToastLabel = styled(Label)<ToastDivProps>(({ theme, toastStyle }) => {
  const color = toastStylesMap(theme)[toastStyle].color;
  return {
    flex: '1',
    color,
  };
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
  const color = toastStylesMap(theme)[feedback].color;

  return {
    color,
  };
});
