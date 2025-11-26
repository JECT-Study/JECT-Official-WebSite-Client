import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { pxToRem } from 'utils';

import type {
  StyledGlobalNavigationListWrapperProps,
  StyledGlobalNavigationWrapperProps,
} from './globalNavigation.types';

import { IconButton } from '@/components';

const globalNavigationStyleMap = (theme: Theme) => ({
  empty: {
    backgroundColor: 'transparent',
    borderBottom: 'none',
  },
  solid: {
    backgroundColor: theme.color.semantic.surface.shallow,
    borderBottom: `1px solid ${theme.color.semantic.stroke.subtle}`,
  },
});

export const StyledGlobalNavigationWrapper = styled.div<StyledGlobalNavigationWrapperProps>(
  ({ theme, $variant }) => {
    const globalNavigationStyles = globalNavigationStyleMap(theme)[$variant];

    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      padding: `${theme.scheme.semantic.spacing[12]} ${theme.scheme.semantic.margin.md}`,
      ...globalNavigationStyles,

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

export const StyledGlobalNavigationRoot = styled(NavigationMenu.Root)(({ theme }) => ({
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

const AlignMap = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
} as const;

export const StyledGlobalNavigationListWrapper = styled.div<StyledGlobalNavigationListWrapperProps>`
  display: flex;
  justify-content: ${({ $align }) => AlignMap[$align]};
  flex: 1;

  & > div {
    position: static !important;
  }

  ${({ theme }) => theme.breakPoint.mobile} {
    justify-content: flex-end;
  }
`;

export const StyledGlobalNavigationList = styled(NavigationMenu.List)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[32],
  whiteSpace: 'nowrap',

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

export const StyledGlobalNavigationLogoLink = styled(NavigationMenu.Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

export const StyledDividerWrapper = styled.div(() => ({
  height: pxToRem(16),
}));

export const StyledGlobalNavigationContent = styled(NavigationMenu.Content)(() => {
  return {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    marginTop: '8px',
  };
});
