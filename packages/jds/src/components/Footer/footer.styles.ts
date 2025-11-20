import styled from '@emotion/styled';

export const StyledFooterRoot = styled.footer(({ theme }) => ({
  backgroundColor: theme.color.semantic.surface.deep,
  color: theme.color.semantic.object.alternative,
  paddingTop: theme.scheme.semantic.spacing['40'],
  paddingBottom: theme.scheme.semantic.spacing['72'],
  paddingLeft: theme.scheme.semantic.margin.md,
  paddingRight: theme.scheme.semantic.margin.md,
  display: 'flex',
  justifyContent: 'center',
}));

export const StyledFooterContent = styled.div(({ theme }) => ({
  width: '100%',
  maxWidth: '922px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.scheme.semantic.spacing['24'],
}));

export const StyledFooterHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledFooterDivider = styled.hr(({ theme }) => ({
  width: '100%',
  height: '1px',
  border: 'none',
  backgroundColor: theme.color.semantic.stroke.alpha.subtle,
  margin: 0,
}));

export const StyledFooterLogo = styled.div({
  display: 'flex',
});

export const StyledFooterSocial = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing['16'],
}));

export const StyledSocialLink = styled.a(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.color.semantic.object.alternative,
  textDecoration: 'none',
  transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,

  '&:hover': {
    opacity: 0.8,
  },

  '&:active': {
    opacity: 0.6,
  },
}));

export const StyledFooterNav = styled.nav(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.scheme.semantic.spacing['16'],

  [theme.breakPoint.mobile]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    paddingBottom: theme.scheme.semantic.spacing['128'],
  },
}));

export const StyledFooterSection = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.scheme.semantic.spacing['20'],
}));

export const StyledSectionTitle = styled.h3(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-label-sm-normal'],
  color: theme.color.semantic.object.alternative,
  margin: 0,
}));

export const StyledLinkList = styled.ul(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.scheme.semantic.spacing['20'],
}));

export const StyledLink = styled.a(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-label-md-normal'],
  color: theme.color.semantic.object.bold,
  textDecoration: 'none',
  transition: `color ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing['4'],

  '&:hover': {
    color: theme.color.semantic.object.normal,
  },
}));

export const StyledFooterBottom = styled.div(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-label-xs-subtle'],
  color: theme.color.semantic.object.alternative,
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing['16'],
  rowGap: theme.scheme.semantic.spacing['8'],
  flexWrap: 'wrap',

  a: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.scheme.semantic.spacing['4'],

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
