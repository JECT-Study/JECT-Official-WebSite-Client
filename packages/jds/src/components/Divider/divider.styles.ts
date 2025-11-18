import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import type { DividerOrientation, DividerThickness } from './divider.types';

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
