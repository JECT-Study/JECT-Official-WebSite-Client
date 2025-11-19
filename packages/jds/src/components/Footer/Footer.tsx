import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import type {
  FooterBottomProps,
  FooterContentProps,
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
  StyledFooterContent,
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

const FooterRoot = forwardRef<HTMLElement, FooterRootProps>(({ children, ...rest }, ref) => {
  return (
    <StyledFooterRoot ref={ref} {...rest}>
      {children}
    </StyledFooterRoot>
  );
});

FooterRoot.displayName = 'Footer.Root';

const FooterContent = forwardRef<HTMLDivElement, FooterContentProps>(
  ({ children, ...rest }, ref) => {
    return (
      <StyledFooterContent ref={ref} {...rest}>
        {children}
      </StyledFooterContent>
    );
  },
);

FooterContent.displayName = 'Footer.Content';

const FooterHeader = forwardRef<HTMLDivElement, FooterHeaderProps>(({ children, ...rest }, ref) => {
  return (
    <StyledFooterHeader ref={ref} {...rest}>
      {children}
    </StyledFooterHeader>
  );
});

FooterHeader.displayName = 'Footer.Header';

const FooterDivider = forwardRef<HTMLHRElement, ComponentPropsWithoutRef<'hr'>>((props, ref) => {
  return <StyledFooterDivider ref={ref} {...props} />;
});

FooterDivider.displayName = 'Footer.Divider';

const FooterLogo = forwardRef<HTMLDivElement, FooterLogoProps>(({ children, ...rest }, ref) => {
  return (
    <StyledFooterLogo ref={ref} {...rest}>
      {children}
    </StyledFooterLogo>
  );
});

FooterLogo.displayName = 'Footer.Logo';

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

const FooterNav = forwardRef<HTMLElement, FooterNavProps>(({ sections, ...rest }, ref) => {
  return (
    <StyledFooterNav ref={ref} {...rest}>
      {sections.map(section => (
        <FooterSection key={section.title} title={section.title} links={section.links} />
      ))}
    </StyledFooterNav>
  );
});

FooterNav.displayName = 'Footer.Nav';

const FooterSection = forwardRef<HTMLDivElement, FooterSectionProps>(
  ({ title, links, ...rest }, ref) => {
    return (
      <StyledFooterSection ref={ref} {...rest}>
        <StyledSectionTitle>{title}</StyledSectionTitle>
        <StyledLinkList>
          {links.map(link => (
            <li key={`${link.href}-${link.label}`}>
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
  Content: FooterContent,
  Header: FooterHeader,
  Divider: FooterDivider,
  Logo: FooterLogo,
  Social: FooterSocial,
  Nav: FooterNav,
  Section: FooterSection,
  Bottom: FooterBottom,
};
