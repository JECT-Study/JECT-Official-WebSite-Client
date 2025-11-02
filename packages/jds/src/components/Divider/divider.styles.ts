import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { textStyle } from 'utils';

import type { DividerOrientation, DividerTextAlign, DividerThickness } from './divider.types';

const thicknessMap: Record<DividerThickness, number> = {
  normal: 1,
  bold: 2,
  bolder: 4,
  boldest: 8,
};

const GetDividerStyles = (
  theme: Theme,
  orientation: DividerOrientation,
  thickness: DividerThickness,
): CSSObject => {
  const borderWidth = thicknessMap[thickness];
  const borderColor = theme.color.semantic.stroke.normal;

  if (orientation === 'horizontal') {
    return {
      width: '100%',
      height: 0,
      border: 'none',
      borderTop: `${borderWidth}px solid ${borderColor}`,
      margin: 0,
      padding: 0,
    };
  }

  return {
    width: 0,
    height: '100%',
    border: 'none',
    borderLeft: `${borderWidth}px solid ${borderColor}`,
    margin: 0,
    padding: 0,
    alignSelf: 'stretch',
  };
};

export const StyledDivider = styled('hr', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $orientation: DividerOrientation;
  $thickness: DividerThickness;
}>(({ theme, $orientation, $thickness }) => ({
  ...GetDividerStyles(theme, $orientation, $thickness),
}));

export const StyledVerticalDivider = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $thickness: DividerThickness;
}>(({ theme, $thickness }) => ({
  ...GetDividerStyles(theme, 'vertical', $thickness),
}));

export const StyledDividerWithTextContainer = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $textAlign: DividerTextAlign;
}>(({ $textAlign }) => {
  const alignmentMap = {
    left: {
      justifyContent: 'flex-start',
    },
    center: {
      justifyContent: 'center',
    },
    right: {
      justifyContent: 'flex-end',
    },
  };

  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    ...alignmentMap[$textAlign],
  };
});

export const StyledDividerLine = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $thickness: DividerThickness;
}>(({ theme, $thickness }) => {
  const borderWidth = thicknessMap[$thickness];
  const borderColor = theme.color.semantic.stroke.normal;

  return {
    flex: 1,
    height: 0,
    border: 'none',
    borderTop: `${borderWidth}px solid ${borderColor}`,
  };
});

//Note: 해당 수치는 임의로 기재
export const StyledDividerTextWrapper = styled('span')(({ theme }) => ({
  ...textStyle(theme, 'desktop', 'label.xs.bold'),
  color: theme.color.semantic.object.neutral,
  padding: `0 ${theme.scheme.desktop.spacing[12]}px`,
  whiteSpace: 'nowrap',

  [theme.breakPoint.tablet]: {
    ...textStyle(theme, 'tablet', 'label.xs.bold'),
    padding: `0 ${theme.scheme.tablet.spacing[12]}px`,
  },

  [theme.breakPoint.mobile]: {
    ...textStyle(theme, 'mobile', 'label.xs.bold'),
    padding: `0 ${theme.scheme.mobile.spacing[12]}px`,
  },
}));
