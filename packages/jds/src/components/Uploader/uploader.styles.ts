import { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, pxToRem } from 'utils';
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
      transition: `all ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
    },
    '&:hover': {
      ...interactionParams.hoverStyle,
    },
    '&:active': {
      ...interactionParams.activeStyle,

      '::after': {
        ...interactionParams.hoverStyle['::after'],
        transition: 'none',
        // TODO: 마우스, 터치 별, entry/exit 별, 액션별 모션을 다르게 적용할 수 있도록 유틸 함수 구현 (js 이벤트 및 애니메이션 이용)
      },
    },
    '&:focus-visible': {
      ...interactionParams.focusStyle,
      transitionDuration: '0s',
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
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.scheme.semantic.spacing[20],
      width: pxToRem(400),
      padding: theme.scheme.semantic.margin.lg,
      borderRadius: theme.scheme.semantic.radius[6],
      color: textColor,
      backgroundColor: bgColor,
      transition: $isDragging
        ? `all ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`
        : 'none',

      '& > span, & > button ': {
        pointerEvents: $isDragging ? 'none' : 'auto',
      },

      '& > svg': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',

        '& > rect': {
          fill: 'none',
          width: '100%',
          height: '100%',
          stroke: borderColor,
          strokeWidth: '1px',
          strokeDasharray: `16,8`,
          strokeLinecap: 'round',
          strokeDashoffset: '8',
          rx: '6',
          ry: '6',
        },
      },
    };
  },
);

export const FileSpan = styled.span(({ theme }) => {
  return {
    textAlign: 'center',
    ...theme.textStyle['semantic-textStyle-body-2xs-bold'],
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
    gap: theme.scheme.semantic.spacing[8],
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
      gap: theme.scheme.semantic.spacing[12],
      width: pxToRem(160),
      padding: theme.scheme.semantic.margin.lg,
      borderRadius: theme.scheme.semantic.radius[6],
      backgroundColor: theme.color.semantic.fill.subtlest,
      ...interaction,
      cursor: $isDisabled || $isLoading ? 'default' : 'pointer',
      position: 'relative',

      '& > svg': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',

        '& > rect': {
          fill: 'none',
          width: '100%',
          height: '100%',
          stroke: theme.color.semantic.stroke.alpha.assistive,
          strokeWidth: '1px',
          strokeDasharray: `16,8`,
          strokeLinecap: 'round',
          strokeDashoffset: '6',
          rx: '6',
          ry: '6',
        },
      },
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
