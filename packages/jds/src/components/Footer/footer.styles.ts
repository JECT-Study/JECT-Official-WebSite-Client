import styled from '@emotion/styled';

import type { StyledFooterNavProps, StyledFooterRootProps } from './footer.types';

// 루트 컨테이너
export const StyledFooterRoot = styled.footer<StyledFooterRootProps>(({ theme, $variant }) => {
  return {
    backgroundColor: theme.color.semantic.surface.deep,
    color: theme.color.semantic.object.alternative,
    padding:
      $variant === 'desktop'
        ? `${theme.scheme.semantic.spacing['48']} ${theme.scheme.semantic.spacing['144']}`
        : $variant === 'tablet'
          ? theme.scheme.semantic.spacing['32']
          : theme.scheme.semantic.spacing['16'],
    display: 'flex',
    flexDirection: 'column',
    gap: theme.scheme.semantic.spacing['24'],
  };
});

// 헤더 컨테이너 (로고 + 소셜 아이콘)
export const StyledFooterHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

// 구분선
export const StyledFooterDivider = styled.hr(({ theme }) => ({
  width: '100%',
  height: '1px',
  border: 'none',
  backgroundColor: theme.color.semantic.stroke.alpha.subtle,
  margin: 0,
}));

// 로고 컨테이너
export const StyledFooterLogo = styled.div({
  display: 'flex',
});

// 소셜 아이콘 컨테이너
export const StyledFooterSocial = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing['16'],
}));

// 소셜 링크
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

// 네비게이션 컨테이너
export const StyledFooterNav = styled.nav<StyledFooterNavProps>(({ theme, $variant }) => {
  return {
    display: 'grid',
    gridTemplateColumns: $variant === 'mobile' ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap:
      $variant === 'desktop'
        ? theme.scheme.semantic.spacing['40']
        : $variant === 'tablet'
          ? theme.scheme.semantic.spacing['24']
          : theme.scheme.semantic.spacing['16'],
  };
});

// 섹션 컨테이너
export const StyledFooterSection = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.scheme.semantic.spacing['12'],
}));

// 섹션 제목
export const StyledSectionTitle = styled.h3(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-label-sm-normal'],
  color: theme.color.semantic.object.alternative,
  marginBottom: theme.scheme.semantic.spacing['4'],
}));

// 링크 목록
export const StyledLinkList = styled.ul(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.scheme.semantic.spacing['8'],
}));

// 링크 아이템
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

// 하단 컨테이너
export const StyledFooterBottom = styled.div(({ theme }) => ({
  ...theme.textStyle['semantic-textStyle-label-xs-subtle'],
  color: theme.color.semantic.object.alternative,
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing['16'],
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
