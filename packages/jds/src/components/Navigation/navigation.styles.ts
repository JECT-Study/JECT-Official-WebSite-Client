import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { pxToRem } from 'utils';

import type { StyledNavigationWrapperProps } from './navigation.types';
import { IconButton } from '../Button/IconButton';

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

export const StyledNavigationRoot = styled(NavigationMenu.Root)(({ theme }) => ({
  position: 'relative',
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

export const StyledNavigationListWrapper = styled.div`
  display: flex;
  flex: 1;

  & > div {
    position: static !important;
  }

  ${props => props.theme.breakPoint.mobile} {
    justify-content: flex-end;
  }
`;

export const StyledNavigationList = styled(NavigationMenu.List)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[32],

  [theme.breakPoint.mobile]: {
    display: 'none',
    gap: theme.scheme.semantic.spacing[24],
  },
}));

export const StyledMobileMenuButton = styled(IconButton.Basic)(({ theme }) => ({
  display: 'none',

  [theme.breakPoint.mobile]: {
    display: 'inline-block',
  },
}));

export const StyledNavigationLogoLink = styled(NavigationMenu.Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

export const StyledDividerWrapper = styled.div(() => ({
  height: pxToRem(16),
}));

export const StyledNavigationContent = styled(NavigationMenu.Content)(() => {
  return {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    marginTop: '8px',
  };
});
