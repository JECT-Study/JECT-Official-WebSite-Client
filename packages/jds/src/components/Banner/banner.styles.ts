import styled from '@emotion/styled';

export const StyledBannerBarRoot = styled.div(({ theme }) => ({
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

export const StyledBannerBarTitles = styled.div(({ theme }) => ({
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
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',

  [theme.breakPoint.mobile]: {
    ...theme.textStyle['semantic-textStyle-label-sm-bold'],
  },
}));

export const StyledBannerBarSubtitle = styled.span(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-label-sm-normal'],
  color: theme.color.semantic.object.static.inverse.bold,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',

  [theme.breakPoint.mobile]: {
    ...theme.textStyle['semantic-textStyle-label-xs-normal'],
  },
}));

export const StyledBannerBarCloseButton = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  button: {
    color: theme.color.semantic.object.inverse.boldest,

    '&:hover': {
      backgroundColor: theme.colorPrimitive.primitive.flow.light.alpha[100],
    },
  },
}));

export const StyledBannerImageRoot = styled.div({
  position: 'relative',
  width: '100%',
  aspectRatio: '2 / 1',
});

export const StyledBannerImageGradient = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
  zIndex: 0,
  pointerEvents: 'none',
});

export const StyledBannerImageContentWrapper = styled.div(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  paddingTop: theme.scheme.semantic.margin.xl,
  paddingBottom: theme.scheme.semantic.margin.xl,
  paddingLeft: theme.scheme.semantic.margin.md,
  paddingRight: theme.scheme.semantic.margin.md,
  pointerEvents: 'none',
}));

export const StyledBannerImageContent = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.scheme.semantic.spacing[16],
  paddingTop: theme.scheme.semantic.spacing[24],
  paddingBottom: theme.scheme.semantic.spacing[24],
  width: '50%',

  [theme.breakPoint.tablet]: {
    paddingTop: theme.scheme.semantic.spacing[8],
    paddingBottom: theme.scheme.semantic.spacing[8],
  },

  [theme.breakPoint.mobile]: {
    paddingTop: 0,
    paddingBottom: 0,
    gap: theme.scheme.semantic.spacing[8],
    width: '100%',
  },
}));

export const StyledBannerImageTitle = styled.div(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-hero-2'],
  color: theme.color.semantic.object.static.inverse.boldest,
  textAlign: 'left',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',

  [theme.breakPoint.tablet]: {
    ...theme.textStyle['semantic-textStyle-hero-1'],
  },

  [theme.breakPoint.mobile]: {
    ...theme.textStyle['semantic-textStyle-title-1'],
    WebkitLineClamp: 2,
  },
}));

export const StyledBannerImageSubtitle = styled.div(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-title-2'],
  color: theme.color.semantic.object.static.inverse.normal,
  textAlign: 'left',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',

  [theme.breakPoint.tablet]: {
    ...theme.textStyle['semantic-textStyle-title-1'],
  },

  [theme.breakPoint.mobile]: {
    ...theme.textStyle['semantic-textStyle-label-lg-bold'],
    WebkitLineClamp: 1,
  },
}));
