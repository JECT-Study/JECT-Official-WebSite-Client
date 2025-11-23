import type * as NavigationMenu from '@radix-ui/react-navigation-menu';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type NavigationVariant = 'empty' | 'solid';

export interface NavigationRootProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Root> {
  variant?: NavigationVariant;
}

export type NavigationListProps = ComponentPropsWithoutRef<typeof NavigationMenu.List>;

export type NavigationItemProps = ComponentPropsWithoutRef<typeof NavigationMenu.Item>;

export type NavigationTriggerProps = ComponentPropsWithoutRef<typeof NavigationMenu.Trigger>;

export interface NavigationLogoDivProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface NavigationLogoLinkProps extends ComponentPropsWithoutRef<'a'> {
  children?: ReactNode;
}

export interface StyledNavigationWrapperProps {
  $variant: NavigationVariant;
}
