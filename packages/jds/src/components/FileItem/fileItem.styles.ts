import styled from '@emotion/styled';
import { Icon } from '@/components';
import { InteractionLayer, pxToRem, textStyle } from 'utils';
import { Label } from '@/components';
import { CSSObject, Theme } from '@emotion/react';
import {
  FileItemColorStateType,
  FileItemColorType,
  FileItemIconProps,
  FileItemLabelProps,
  FileItemWrapButtonProps,
  FileSizeProps,
} from './fileItem.types';

const getColor = (
  { hasError, disabled, readonly }: FileItemColorStateType,
  { defaultColor, errorColor, disabledColor, readonlyColor }: FileItemColorType,
) => {
  if (hasError && errorColor) return errorColor;
  if (disabled && disabledColor) return disabledColor;
  if (readonly && readonlyColor) return readonlyColor;
  return defaultColor;
};

const interactionStyles = (theme: Theme, disabled: boolean, readonly: boolean): CSSObject => {
  const offset = {
    vertical: 6,
    horizontal: 8,
  };
  const borderRadius = 6;

  const makeLayer = (state: 'rest' | 'hover' | 'active' | 'focus') =>
    InteractionLayer({
      theme,
      state,
      variant: 'accent',
      density: 'assistive',
      fillColor: 'default',
      isReadonly: disabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    });

  const interactionParams = {
    restStyle: makeLayer('rest'),
    hoverStyle: makeLayer('hover'),
    activeStyle: makeLayer('active'),
    focusStyle: makeLayer('focus'),
  };

  const textDecoration = !disabled && {
    '.file-name': {
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
    },
  };

  if (readonly) return { ...interactionParams.restStyle };

  return {
    ...interactionParams.restStyle,
    '::after': {
      ...interactionParams.restStyle['::after'],
      transition: `opacity ${theme.environment.duration[100]}ms ${theme.environment.motion.fluent}`,
    },
    '&:hover': {
      ...interactionParams.hoverStyle,
      ...textDecoration,
    },
    '&:active': {
      ...interactionParams.activeStyle,
      ...textDecoration,

      '::after': {
        ...interactionParams.hoverStyle['::after'],
        transition: 'none',
      },
    },
    '&:focus-visible': {
      ...interactionParams.focusStyle,
      ...textDecoration,
      transition: 'none',
    },
  };
};

export const FileItemWrapButton = styled.button<FileItemWrapButtonProps>(
  ({ theme, $disabled, $readonly, $hasError }) => {
    const interaction: CSSObject = $hasError
      ? {
          '::after': {
            content: '""',
            position: 'absolute',
            top: -6,
            bottom: -6,
            left: -8,
            right: -8,
            width: 'auto',
            height: 'auto',
            backgroundColor: theme.color.semantic.feedback.destructive.alpha.subtlest,
            borderRadius: 6,
            pointerEvents: 'none',
          },
        }
      : interactionStyles(theme, $disabled, $readonly);

    return {
      position: 'relative',
      width: pxToRem(404),
      display: 'flex',
      flexDirection: 'column',
      gap: pxToRem(theme.scheme.desktop.spacing[8]),
      ...interaction,
      cursor: $disabled ? 'default' : 'pointer',
    };
  },
);

export const FileItemSectionDiv = styled.div(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: pxToRem(theme.scheme.desktop.spacing[6]),
  };
});

export const FileItemDataContainer = styled.div(({ theme }) => {
  return {
    flex: '1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: pxToRem(theme.scheme.desktop.spacing[16]),
  };
});

export const FileItemIcon = styled(Icon)<FileItemIconProps>(({
  theme,
  $readonly,
  $disabled,
  $hasError,
}) => {
  return {
    color: getColor(
      {
        hasError: $hasError,
        disabled: $disabled,
        readonly: $readonly,
      },
      {
        errorColor: theme.color.semantic.object.bold,
        disabledColor: theme.color.semantic.object.subtle,
        readonlyColor: theme.color.semantic.object.bold,
        defaultColor: theme.color.semantic.accent.neutral,
      },
    ),
  };
});

export const FileItemLabel = styled(Label)<FileItemLabelProps>(({
  theme,
  $readonly,
  $disabled,
  $hasError,
}) => {
  return {
    flex: '1',
    cursor: $disabled ? 'default' : 'pointer',
    color: getColor(
      {
        hasError: $hasError,
        disabled: $disabled,
        readonly: $readonly,
      },
      {
        errorColor: theme.color.semantic.object.bold,
        disabledColor: theme.color.semantic.object.subtle,
        readonlyColor: theme.color.semantic.object.bold,
        defaultColor: theme.color.semantic.accent.neutral,
      },
    ),
  };
});

export const FileSizeLabel = styled(Label)<FileSizeProps>(({ theme, $disabled, $hasError }) => {
  return {
    color: getColor(
      {
        hasError: $hasError,
        disabled: $disabled,
      },
      {
        errorColor: theme.color.semantic.object.neutral,
        disabledColor: theme.color.semantic.object.assistive,
        defaultColor: theme.color.semantic.object.neutral,
      },
    ),
  };
});

export const FileErrorSpan = styled.span(({ theme }) => {
  return {
    color: theme.color.semantic.feedback.destructive.neutral,
    ...textStyle(theme, 'desktop', 'body.2xs.normal'),
    textAlign: 'left',
  };
});
