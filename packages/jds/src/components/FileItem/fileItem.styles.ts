import styled from '@emotion/styled';
import { Icon } from '@/components';
import { InteractionLayer, pxToRem, textStyle } from 'utils';
import { Label } from '@/components';
import { CSSObject, Theme } from '@emotion/react';

interface FileItemWrapButtonProps {
  isDisabled: boolean;
  hasError: boolean;
}

interface FileItemIconProps {
  isReadonly: boolean;
  isDisabled: boolean;
  hasError: boolean;
}

interface FileItemLabelProps {
  isReadonly: boolean;
  isDisabled: boolean;
  hasError: boolean;
}

interface FileSizeProps {
  isDisabled: boolean;
  hasError: boolean;
}

const interactionStyles = (theme: Theme, disabled: boolean): CSSObject => {
  const offset = {
    vertical: 6,
    horizontal: 8,
  };
  const borderRadius = 6;

  const interactionParams = {
    restStyle: InteractionLayer({
      theme,
      state: 'rest',
      variant: 'normal',
      density: 'bold',
      fillColor: 'default',
      isReadonly: disabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    }),
    hoverStyle: InteractionLayer({
      theme,
      state: 'hover',
      variant: 'normal',
      density: 'bold',
      fillColor: 'default',
      isReadonly: disabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    }),
    activeStyle: InteractionLayer({
      theme,
      state: 'active',
      variant: 'normal',
      density: 'bold',
      fillColor: 'default',
      isReadonly: disabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    }),
    focusStyle: InteractionLayer({
      theme,
      state: 'focus',
      variant: 'normal',
      density: 'bold',
      fillColor: 'default',
      isReadonly: disabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    }),
  };

  return {
    ...interactionParams.restStyle,
    '&:hover': {
      ...interactionParams.hoverStyle,
    },
    '&:active': {
      ...interactionParams.activeStyle,
    },
    '&:focus-visible': {
      ...interactionParams.focusStyle,
    },
  };
};

export const FileItemWrapButton = styled.button<FileItemWrapButtonProps>(
  ({ theme, isDisabled, hasError }) => {
    const interaction = hasError
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
            backgroundColor: theme.color.feedback.destructive.alpha.subtlest,
            borderRadius: 6,
          },
        }
      : interactionStyles(theme, isDisabled);
    return {
      position: 'relative',
      width: pxToRem(404),
      display: 'flex',
      flexDirection: 'column',
      gap: pxToRem(theme.scheme.desktop.spacing[8]),

      '.dataContainer': {
        flex: '1',
      },

      ...interaction,
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: pxToRem(theme.scheme.desktop.spacing[16]),
  };
});

export const FileItemIcon = styled(Icon)<FileItemIconProps>(({
  theme,
  isReadonly,
  isDisabled,
  hasError,
}) => {
  return {
    color: hasError
      ? theme.color.object.bold
      : isDisabled
        ? theme.color.object.subtle
        : isReadonly
          ? theme.color.object.bold
          : theme.color.accent.neutral,
  };
});

export const FileItemLabel = styled(Label)<FileItemLabelProps>(({
  theme,
  isReadonly,
  isDisabled,
  hasError,
}) => {
  return {
    color: hasError
      ? theme.color.object.bold
      : isDisabled
        ? theme.color.object.subtle
        : isReadonly
          ? theme.color.object.bold
          : theme.color.accent.neutral,
  };
});

export const FileSizeLabel = styled(Label)<FileSizeProps>(({ theme, isDisabled, hasError }) => {
  return {
    color: hasError
      ? theme.color.object.neutral
      : isDisabled
        ? theme.color.object.assistive
        : theme.color.object.neutral,
  };
});

export const FileErrorP = styled.p(({ theme }) => {
  return {
    color: theme.color.feedback.destructive.neutral,
    ...textStyle(theme, 'desktop', 'body.2xs.normal'),
    textAlign: 'left',
  };
});
