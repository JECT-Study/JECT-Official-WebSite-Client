import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { IconSize } from '../Icon/Icon.types';

export type FooterVariant = 'desktop' | 'tablet' | 'mobile';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterRootProps extends ComponentPropsWithoutRef<'footer'> {
  variant?: FooterVariant;
  children: ReactNode;
}

export interface FooterHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export interface FooterLogoProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface FooterNavProps extends ComponentPropsWithoutRef<'nav'> {
  sections: FooterSection[];
  variant?: FooterVariant;
}

export interface FooterSectionProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialProps extends ComponentPropsWithoutRef<'div'> {
  github?: string;
  instagram?: string;
  iconSize?: IconSize;
}

export interface FooterBottomProps extends ComponentPropsWithoutRef<'div'> {
  copyright: string;
  email?: string;
  privacyLink?: string;
}

export interface StyledFooterRootProps {
  $variant: FooterVariant;
}

export interface StyledFooterNavProps {
  $variant: FooterVariant;
}
