import styled from '@emotion/styled';
import { Icon } from '@/components';
import { InteractionLayer } from 'utils';
import { Label } from '@/components';
import { CSSObject, Theme } from '@emotion/react';
import { FileItemLabelProps, FileItemWrapButtonProps, FileSizeProps } from './fileItem.types';

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
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      gap: theme.scheme.semantic.spacing[8],
      ...interaction,
      cursor: $disabled ? 'default' : 'pointer',
      color: $hasError
        ? theme.color.semantic.object.bold
        : $disabled
          ? theme.color.semantic.object.subtle
          : $readonly
            ? theme.color.semantic.object.bold
            : theme.color.semantic.accent.neutral,
    };
  },
);

export const FileItemSectionDiv = styled.div(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.scheme.semantic.spacing[6],
  };
});

export const FileItemDataContainer = styled.div(({ theme }) => {
  return {
    flex: '1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.scheme.semantic.spacing[16],
  };
});

export const FileItemIcon = styled(Icon)(() => {
  return {
    color: 'inherit',
  };
});

export const FileItemLabel = styled(Label)<FileItemLabelProps>(({ $disabled }) => {
  return {
    flex: '1',
    cursor: $disabled ? 'default' : 'pointer',
    color: 'inherit',
  };
});

export const FileSizeLabel = styled(Label)<FileSizeProps>(({ theme, $disabled, $hasError }) => {
  return {
    color: $hasError
      ? theme.color.semantic.object.neutral
      : $disabled
        ? theme.color.semantic.object.assistive
        : theme.color.semantic.object.neutral,
  };
});

export const FileErrorSpan = styled.span(({ theme }) => {
  return {
    color: theme.color.semantic.feedback.destructive.neutral,
    ...theme.textStyle['semantic-textStyle-body-2xs-normal'],
    textAlign: 'left',

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
});
