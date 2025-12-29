import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { IconSize } from "../Icon/Icon.types";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterRootProps extends ComponentPropsWithoutRef<"footer"> {
  children: ReactNode;
}

export interface FooterContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface FooterHeaderProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface FooterLogoLinkProps extends ComponentPropsWithoutRef<"a"> {
  children?: ReactNode;
}

export interface FooterLogoDivProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

export interface FooterNavProps extends ComponentPropsWithoutRef<"nav"> {
  sections: FooterSection[];
}

export interface FooterSectionProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialProps extends ComponentPropsWithoutRef<"div"> {
  github?: string;
  instagram?: string;
  iconSize?: IconSize;
}

export interface FooterBottomProps extends ComponentPropsWithoutRef<"div"> {
  copyright: string;
  email?: string;
  privacyLink?: string;
}
