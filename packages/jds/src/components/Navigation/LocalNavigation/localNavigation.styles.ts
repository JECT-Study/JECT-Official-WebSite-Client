import styled from '@emotion/styled';

import type { StyledLocalNavigationRootProps } from './localNavigation.types';

export const StyledLocalNavigationRoot = styled.div<StyledLocalNavigationRootProps>(
  ({ theme, $isStretched }) => ({
    width: '100%',
    padding: $isStretched
      ? `${theme.scheme.semantic.spacing[8]} 0`
      : `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.margin.md}`,
  }),
);

export const StyledLocalNavigationWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.scheme.semantic.spacing[24],

  [theme.breakPoint.tablet]: {
    gap: theme.scheme.semantic.spacing[20],
  },

  [theme.breakPoint.mobile]: {
    gap: theme.scheme.semantic.spacing[16],
  },
}));

export const StyledLocalNavigationTitle = styled.div(({ theme }) => ({
  flex: 1,
  color: theme.color.semantic.object.boldest,
  ...theme.textStyle['semantic-textStyle-title-1'],

  [theme.breakPoint.mobile]: {
    ...theme.textStyle['semantic-textStyle-label-lg-bold'],
  },
}));

export const StyledLocalNavigationButtonGroup = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[24],

  [theme.breakPoint.tablet]: {
    gap: theme.scheme.semantic.spacing[20],
  },

  [theme.breakPoint.mobile]: {
    gap: theme.scheme.semantic.spacing[12],
  },
}));
