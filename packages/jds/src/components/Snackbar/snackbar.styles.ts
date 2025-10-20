import styled from '@emotion/styled';
import { pxToRem, shadow, textStyle } from 'utils';
import { Icon, Label } from '@/components';
import { SnackbarDivProps, SnackbarFeedbackIconProps, SnackbarStyle } from './snackbar.types';
import { keyframes } from '@emotion/react';
import { snackbarStylesMap } from './snackbar.variants';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

export const SnackbarStackContainer = styled.div(({ theme }) => {
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

export const SnackbarDiv = styled.div<SnackbarDivProps>(({ theme, snackbarStyle, isExiting }) => {
  const color = snackbarStylesMap(theme)[snackbarStyle].color;
  const borderColor = snackbarStylesMap(theme)[snackbarStyle].borderColor;
  const backgroundColor = snackbarStylesMap(theme)[snackbarStyle].backgroundColor;

  return {
    display: 'flex',
    flexDirection: 'column',
    gap: pxToRem(theme.scheme.desktop.spacing[16]),
    width: pxToRem(300),
    minHeight: pxToRem(55),
    padding: `16px 20px`,
    border: `${theme.scheme.desktop.stroke.weight[1]}px solid ${borderColor}`,
    borderRadius: `${theme.scheme.desktop.radius[10]}px`,
    backgroundColor: theme.color.surface.shallow,
    color,
    ...shadow(theme, 'desktop', 'overlay'),

    position: 'relative',
    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      backgroundColor,
      opacity: `${theme.scheme.desktop.opacity[36]}%`,
      zIndex: '-10',
    },

    animation: isExiting
      ? `${slideOut}  ${theme.environment.duration[250]}ms ${theme.environment.motion.bouncy} forwards`
      : `${slideIn}  ${theme.environment.duration[250]}ms ${theme.environment.motion.bouncy} forwards`,
  };
});

export const SnackbarLabel = styled(Label)<{ snackbarStyle: SnackbarStyle }>(({
  theme,
  snackbarStyle,
}) => {
  return { flex: '1', color: snackbarStylesMap(theme)[snackbarStyle].color };
});

export const SnackbarContentDiv = styled.div(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: pxToRem(theme.scheme.desktop.spacing[6]),
  };
});

export const SnackbarLabelContainerDiv = styled.div(({ theme }) => {
  return {
    display: 'flex',
    gap: pxToRem(theme.scheme.desktop.spacing[8]),
    justifyContent: 'space-between',
    alignItems: 'center',
  };
});

export const SnackbarCaptionP = styled.p(({ theme }) => {
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

export const SnackbarFeedbackIcon = styled(Icon)<SnackbarFeedbackIconProps>(({
  theme,
  feedback,
}) => {
  return { color: snackbarStylesMap(theme)[feedback].color };
});
