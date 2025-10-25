import styled from '@emotion/styled';
import { Icon } from '@/components';
import { InteractionLayer, pxToRem, textStyle } from 'utils';
import { Label } from '@/components';
import { CSSObject, Theme } from '@emotion/react';
import {
  FileItemIconProps,
  FileItemLabelProps,
  FileItemWrapButtonProps,
  FileSizeProps,
} from './fileItem.types';

const interactionStyles = (
  theme: Theme,
  isDownloadDisabled: boolean,
  readonly: boolean,
): CSSObject => {
  const offset = {
    vertical: 6,
    horizontal: 8,
  };
  const borderRadius = 6;

  const interactionParams = {
    restStyle: InteractionLayer({
      theme,
      state: 'rest',
      variant: 'accent',
      density: 'assistive',
      fillColor: 'default',
      isReadonly: isDownloadDisabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    }),
    hoverStyle: InteractionLayer({
      theme,
      state: 'hover',
      variant: 'accent',
      density: 'assistive',
      fillColor: 'default',
      isReadonly: isDownloadDisabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    }),
    activeStyle: InteractionLayer({
      theme,
      state: 'active',
      variant: 'accent',
      density: 'assistive',
      fillColor: 'default',
      isReadonly: isDownloadDisabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    }),
    focusStyle: InteractionLayer({
      theme,
      state: 'focus',
      variant: 'accent',
      density: 'assistive',
      fillColor: 'default',
      isReadonly: isDownloadDisabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    }),
  };

  const textDecoration = !isDownloadDisabled && {
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
  ({ theme, $isDownloadDisabled, $readonly, $hasError }) => {
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
      : interactionStyles(theme, $isDownloadDisabled, $readonly);

    return {
      position: 'relative',
      width: pxToRem(404),
      display: 'flex',
      flexDirection: 'column',
      gap: pxToRem(theme.scheme.desktop.spacing[8]),
      ...interaction,
      cursor: $isDownloadDisabled ? 'default' : 'pointer',
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
  $isDownloadDisabled,
  $hasError,
}) => {
  return {
    color: $hasError
      ? theme.color.semantic.object.bold
      : $isDownloadDisabled
        ? theme.color.semantic.object.subtle
        : $readonly
          ? theme.color.semantic.object.bold
          : theme.color.semantic.accent.neutral,
  };
});

export const FileItemLabel = styled(Label)<FileItemLabelProps>(({
  theme,
  $readonly,
  $isDownloadDisabled,
  $hasError,
}) => {
  return {
    flex: '1',
    cursor: $isDownloadDisabled ? 'default' : 'pointer',
    color: $hasError
      ? theme.color.semantic.object.bold
      : $isDownloadDisabled
        ? theme.color.semantic.object.subtle
        : $readonly
          ? theme.color.semantic.object.bold
          : theme.color.semantic.accent.neutral,
  };
});

export const FileSizeLabel = styled(Label)<FileSizeProps>(({
  theme,
  $isDownloadDisabled,
  $hasError,
}) => {
  return {
    color: $hasError
      ? theme.color.semantic.object.neutral
      : $isDownloadDisabled
        ? theme.color.semantic.object.assistive
        : theme.color.semantic.object.neutral,
  };
});

export const FileErrorSpan = styled.span(({ theme }) => {
  return {
    color: theme.color.semantic.feedback.destructive.neutral,
    ...textStyle(theme, 'desktop', 'body.2xs.normal'),
    textAlign: 'left',
  };
});
