import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { pxToRem } from 'utils';

import type { StyledNavigationWrapperProps } from './navigation.types';

const navigationStyleMap = (theme: Theme) => ({
  empty: {
    backgroundColor: 'transparent',
    borderBottom: 'none',
  },
  solid: {
    backgroundColor: theme.color.semantic.surface.shallow,
    borderBottom: `1px solid ${theme.color.semantic.stroke.subtle}`,
  },
});

export const StyledNavigationWrapper = styled.div<StyledNavigationWrapperProps>(
  ({ theme, $variant }) => {
    const navigationStyles = navigationStyleMap(theme)[$variant];

    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      padding: `${theme.scheme.semantic.spacing[12]} ${theme.scheme.semantic.margin.md}`,
      ...navigationStyles,

      [theme.breakPoint.tablet]: {
        justifyContent: 'flex-start',
        padding: `${theme.scheme.semantic.spacing[10]} ${theme.scheme.semantic.margin.md}`,
      },

      [theme.breakPoint.mobile]: {
        justifyContent: 'flex-start',
      },
    };
  },
);

export const StyledNavigationRoot = styled.nav(({ theme }) => ({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[24],
  width: pxToRem(922),
  height: pxToRem(32),

  [theme.breakPoint.tablet]: {
    width: pxToRem(728),
    gap: theme.scheme.semantic.spacing[20],
  },

  [theme.breakPoint.mobile]: {
    gap: 'none',
  },
}));

export const StyledNavigationList = styled.ul(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[32],

  [theme.breakPoint.mobile]: {
    display: 'none',
    gap: theme.scheme.semantic.spacing[24],
  },
}));

export const StyledNavigationListWrapper = styled.div(() => ({
  flex: 1,
}));

export const StyledMobileMenuButton = styled.div(({ theme }) => ({
  display: 'none',

  [theme.breakPoint.mobile]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const StyledNavigationLogoDiv = styled.div(() => ({}));

export const StyledNavigationLogoLink = styled.a(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

export const StyledDividerWrapper = styled.div(() => ({
  height: pxToRem(16),
}));

export const StyledSegmentedControlWrapper = styled.div(({ theme }) => ({
  width: pxToRem(160),

  [theme.breakPoint.mobile]: {
    display: 'none',
  },
}));

export const StyledDesktopTrigger = styled.span(({ theme }) => ({
  display: 'inline-flex',

  [theme.breakPoint.tablet]: {
    display: 'none',
  },
}));

export const StyledTabletTrigger = styled.span(({ theme }) => ({
  display: 'none',

  [theme.breakPoint.tablet]: {
    display: 'inline-flex',
  },

  [theme.breakPoint.mobile]: {
    display: 'none',
  },
}));
