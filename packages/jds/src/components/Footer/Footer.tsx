import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type {
  FooterBottomProps,
  FooterHeaderProps,
  FooterLogoProps,
  FooterNavProps,
  FooterRootProps,
  FooterSectionProps,
  FooterSocialProps,
} from './footer.types';
import { Icon } from '../Icon';
import {
  StyledFooterBottom,
  StyledFooterDivider,
  StyledFooterHeader,
  StyledFooterLogo,
  StyledFooterNav,
  StyledFooterRoot,
  StyledFooterSection,
  StyledFooterSocial,
  StyledLink,
  StyledLinkList,
  StyledSectionTitle,
  StyledSocialLink,
} from './footer.styles';

// 루트 컴포넌트
const FooterRoot = forwardRef<HTMLElement, FooterRootProps>(
  ({ variant = 'desktop', children, ...rest }, ref) => {
    return (
      <StyledFooterRoot ref={ref} $variant={variant} {...rest}>
        {children}
      </StyledFooterRoot>
    );
  },
);

FooterRoot.displayName = 'Footer.Root';

// 헤더 컴포넌트 (로고 + 소셜 아이콘)
const FooterHeader = forwardRef<HTMLDivElement, FooterHeaderProps>(({ children, ...rest }, ref) => {
  return (
    <StyledFooterHeader ref={ref} {...rest}>
      {children}
    </StyledFooterHeader>
  );
});

FooterHeader.displayName = 'Footer.Header';

// 구분선 컴포넌트
const FooterDivider = forwardRef<HTMLHRElement, ComponentPropsWithoutRef<'hr'>>((props, ref) => {
  return <StyledFooterDivider ref={ref} {...props} />;
});

FooterDivider.displayName = 'Footer.Divider';

// 로고 컴포넌트
const FooterLogo = forwardRef<HTMLDivElement, FooterLogoProps>(({ children, ...rest }, ref) => {
  return (
    <StyledFooterLogo ref={ref} {...rest}>
      {children}
    </StyledFooterLogo>
  );
});

FooterLogo.displayName = 'Footer.Logo';

// 소셜 아이콘 컴포넌트
const FooterSocial = forwardRef<HTMLDivElement, FooterSocialProps>(
  ({ github, instagram, iconSize = 'md', ...rest }, ref) => {
    return (
      <StyledFooterSocial ref={ref} {...rest}>
        {github && (
          <StyledSocialLink
            href={github}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub'
          >
            <Icon name='github-fill' size={iconSize} />
          </StyledSocialLink>
        )}
        {instagram && (
          <StyledSocialLink
            href={instagram}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Instagram'
          >
            <Icon name='instagram' size={iconSize} />
          </StyledSocialLink>
        )}
      </StyledFooterSocial>
    );
  },
);

FooterSocial.displayName = 'Footer.Social';

// 네비게이션 컴포넌트
const FooterNav = forwardRef<HTMLElement, FooterNavProps>(
  ({ sections, variant = 'desktop', ...rest }, ref) => {
    return (
      <StyledFooterNav ref={ref} $variant={variant} {...rest}>
        {sections.map((section, index) => (
          <FooterSection key={index} title={section.title} links={section.links} />
        ))}
      </StyledFooterNav>
    );
  },
);

FooterNav.displayName = 'Footer.Nav';

// 섹션 컴포넌트
const FooterSection = forwardRef<HTMLDivElement, FooterSectionProps>(
  ({ title, links, ...rest }, ref) => {
    return (
      <StyledFooterSection ref={ref} {...rest}>
        <StyledSectionTitle>{title}</StyledSectionTitle>
        <StyledLinkList>
          {links.map((link, index) => (
            <li key={index}>
              <StyledLink
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.label}
                {link.external && <Icon name='external-link-line' size='xs' />}
              </StyledLink>
            </li>
          ))}
        </StyledLinkList>
      </StyledFooterSection>
    );
  },
);

FooterSection.displayName = 'Footer.Section';

// 하단 컴포넌트
const FooterBottom = forwardRef<HTMLDivElement, FooterBottomProps>(
  ({ copyright, email, privacyLink, ...rest }, ref) => {
    return (
      <StyledFooterBottom ref={ref} {...rest}>
        <span>{copyright}</span>
        {email && <span>{email}</span>}
        {privacyLink && (
          <a href={privacyLink} target='_blank' rel='noopener noreferrer'>
            개인정보처리방침
            <Icon name='external-link-line' size='xs' />
          </a>
        )}
      </StyledFooterBottom>
    );
  },
);

FooterBottom.displayName = 'Footer.Bottom';

export const Footer = {
  Root: FooterRoot,
  Header: FooterHeader,
  Divider: FooterDivider,
  Logo: FooterLogo,
  Social: FooterSocial,
  Nav: FooterNav,
  Section: FooterSection,
  Bottom: FooterBottom,
};
