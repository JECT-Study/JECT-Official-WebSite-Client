import styled from '@emotion/styled';

export const StyledBannerRoot = styled.div(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  background: `linear-gradient(88deg, ${theme.color.semantic.surface.static.inverse.shallow} 0%, ${theme.color.semantic.accent.normal} 100%)`,
  paddingTop: theme.scheme.semantic.spacing[8],
  paddingBottom: theme.scheme.semantic.spacing[8],
  paddingLeft: theme.scheme.semantic.margin.md,
  paddingRight: theme.scheme.semantic.margin.md,
  gap: theme.scheme.semantic.spacing[48],
  justifyContent: 'center',

  [theme.breakPoint.tablet]: {
    gap: theme.scheme.semantic.spacing[32],
  },

  [theme.breakPoint.mobile]: {
    gap: theme.scheme.semantic.spacing[16],
  },
}));

export const StyledBannerBarContent = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[16],
}));

export const StyledBannerTitles = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[16],
  flex: 1,
  minWidth: 0,

  [theme.breakPoint.mobile]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.scheme.semantic.spacing[2],
  },
}));

export const StyledBannerBarTitle = styled.span(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-label-md-bold'],
  color: theme.color.semantic.object.static.inverse.boldest,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',

  [theme.breakPoint.mobile]: {
    ...theme.textStyle['semantic-textStyle-label-sm-bold'],
  },
}));

export const StyledBannerBarSubtitle = styled.span(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-label-sm-normal'],
  color: theme.color.semantic.object.static.inverse.bold,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',

  [theme.breakPoint.mobile]: {
    ...theme.textStyle['semantic-textStyle-label-xs-normal'],
  },
}));

export const StyledBannerCloseButton = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  button: {
    color: theme.color.semantic.object.inverse.boldest,

    '&:hover': {
      backgroundColor: theme.colorPrimitive.primitive.flow.light.alpha[100],
    },
  },
}));
