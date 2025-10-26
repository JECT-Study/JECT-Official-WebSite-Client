import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { pxToRem, textStyle } from 'utils';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { UploaderFileContainerDivProps, UploaderState } from './uploader.types';

const uploaderFileStylesMap = (
  theme: Theme,
  disabled: boolean,
  isLoading: boolean,
  state: UploaderState,
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

  const baseStyle = isLoading ? stylesByState.rest : stylesByState[state];
  return disabled ? disabledStyle : baseStyle;
};

export const UploaderFileContainerDiv = styled.div<UploaderFileContainerDivProps>(
  ({ theme, $isDisabled, $isLoading, state }) => {
    const { borderColor, textColor, bgColor } = uploaderFileStylesMap(
      theme,
      $isDisabled,
      $isLoading,
      state,
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

export const UploaderFileSpan = styled.span(({ theme }) => {
  const textStyleKey = 'body.2xs.bold';

  return {
    textAlign: 'center',
    ...textStyle(theme, 'desktop', textStyleKey),
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', textStyleKey) },
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', textStyleKey) },
  };
});

export const UploaderLoadingIcon = styled(Icon)(({ theme }) => {
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

export const HelperLabel = styled(Label)(({ theme }) => {
  return {
    color: theme.color.semantic.object.assistive,
  };
});
