import styled from '@emotion/styled';

import type { StyledLocalNavigationRootProps } from './localNavigation.types';

export const StyledLocalNavigationRoot = styled.div<StyledLocalNavigationRootProps>(
  ({ theme, $isStretched }) => ({
    width: '100%',
    padding: $isStretched
      ? `${theme.scheme.semantic.spacing[8]} 0`
      : `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.margin.md}`,

    // [theme.breakPoint.tablet]: {
    //   width: pxToRem(728),
    //   gap: theme.scheme.semantic.spacing[20],
    // },

    // [theme.breakPoint.mobile]: {
    //   gap: 'none',
    // },
  }),
);

export const StyledLocalNavigationWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.scheme.semantic.spacing[24],
}));

export const StyledLocalNavigationTitle = styled.div(() => ({
  flex: 1,
}));

export const StyledLocalNavigationButtonGroup = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[24],
}));
