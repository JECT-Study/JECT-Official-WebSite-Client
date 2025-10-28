import { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, pxToRem, textStyle } from 'utils';
import { Icon } from '@/components';
import { Label } from '@/components';
import {
  UploaderFileContainerDivProps,
  UploaderImageContainerButtonProps,
  UploaderImageIconProps,
  UploaderImageLabelProps,
} from './uploader.types';

const uploaderFileStylesMap = (
  theme: Theme,
  disabled: boolean,
  isLoading: boolean,
  isDragging: boolean,
) => {
  const stylesByState = {
    rest: {
      borderColor: theme.color.semantic.stroke.alpha.assistive,
      textColor: theme.color.semantic.object.neutral,
      bgColor: theme.color.semantic.fill.subtlest,
    },
    dragover: {
      borderColor: theme.color.semantic.accent.neutral,
      textColor: theme.color.semantic.object.neutral,
      bgColor: theme.color.semantic.accent.alpha.subtler,
    },
  } as const;

  const disabledStyle = {
    borderColor: theme.color.semantic.stroke.alpha.subtle,
    textColor: theme.color.semantic.object.assistive,
    bgColor: theme.color.semantic.fill.subtlest,
  };

  const dragStyle = isDragging ? stylesByState['dragover'] : stylesByState['rest'];
  const baseStyle = isLoading ? stylesByState.rest : dragStyle;
  return disabled ? disabledStyle : baseStyle;
};

const interactionStyles = (theme: Theme, isDisabled: boolean): CSSObject => {
  const offset = {
    vertical: 0,
    horizontal: 0,
  };
  const borderRadius = 6;

  const makeLayer = (state: 'rest' | 'hover' | 'active' | 'focus') =>
    InteractionLayer({
      theme,
      state,
      variant: 'normal',
      density: 'assistive',
      fillColor: 'default',
      isDisabled: isDisabled,
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

  return {
    ...interactionParams.restStyle,
    '::after': {
      ...interactionParams.restStyle['::after'],
      transition: `opacity ${theme.environment.duration[100]}ms ${theme.environment.motion.fluent}`,
    },
    '&:hover': {
      ...interactionParams.hoverStyle,
    },
    '&:active': {
      ...interactionParams.activeStyle,

      '::after': {
        ...interactionParams.hoverStyle['::after'],
        transition: 'none',
      },
    },
    '&:focus-visible': {
      ...interactionParams.focusStyle,
      transition: 'none',
    },
  };
};

export const FileDropZoneDiv = styled.div<UploaderFileContainerDivProps>(
  ({ theme, $isDisabled, $isLoading, $isDragging }) => {
    const { borderColor, textColor, bgColor } = uploaderFileStylesMap(
      theme,
      $isDisabled,
      $isLoading,
      $isDragging,
    );

    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: pxToRem(theme.scheme.desktop.spacing[20]),
      width: pxToRem(400),
      padding: theme.scheme.desktop.margin.lg,
      borderRadius: theme.scheme.desktop.radius[6],
      color: textColor,
      border: `1px dashed ${borderColor}`,
      backgroundColor: bgColor,
    };
  },
);

export const FileSpan = styled.span(({ theme }) => {
  const textStyleKey = 'body.2xs.bold';

  return {
    textAlign: 'center',
    ...textStyle(theme, 'desktop', textStyleKey),
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', textStyleKey) },
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', textStyleKey) },
  };
});

export const LoadingIcon = styled(Icon)(({ theme }) => {
  return {
    color: theme.color.semantic.object.alternative,
  };
});

export const FlexRowDiv = styled.div(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pxToRem(theme.scheme.desktop.spacing[8]),
  };
});

export const FileHelperLabel = styled(Label)(({ theme }) => {
  return {
    color: theme.color.semantic.object.assistive,
  };
});

export const ImageDropZoneButton = styled.button<UploaderImageContainerButtonProps>(
  ({ theme, $isDisabled, $isLoading }) => {
    const interaction = ($isDisabled || !$isLoading) && interactionStyles(theme, $isDisabled);
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: pxToRem(theme.scheme.desktop.spacing[12]),
      width: pxToRem(160),
      padding: theme.scheme.desktop.margin.lg,
      borderRadius: theme.scheme.desktop.radius[6],
      border: `1px dashed ${theme.color.semantic.stroke.alpha.assistive}`,
      backgroundColor: theme.color.semantic.fill.subtlest,
      ...interaction,
      cursor: $isDisabled || $isLoading ? 'default' : 'pointer',
    };
  },
);

export const AddIcon = styled(Icon)<UploaderImageIconProps>(({ theme, $isDisabled }) => {
  return {
    color: $isDisabled
      ? theme.color.semantic.object.subtle
      : theme.color.semantic.object.alternative,
  };
});

export const ImageLabel = styled(Label)<UploaderImageLabelProps>(({ theme, $isDisabled }) => {
  return {
    color: $isDisabled ? theme.color.semantic.object.subtle : theme.color.semantic.object.neutral,
  };
});

export const HiddenInput = styled.input(() => {
  return {
    display: 'none',
  };
});
