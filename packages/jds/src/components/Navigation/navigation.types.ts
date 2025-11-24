import type * as NavigationMenu from '@radix-ui/react-navigation-menu';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type NavigationVariant = 'empty' | 'solid';

export interface NavigationRootProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Root> {
  variant?: NavigationVariant;
}

export type NavigationListProps = ComponentPropsWithoutRef<typeof NavigationMenu.List>;

export interface NavigationToggleItemProps
  extends ComponentPropsWithoutRef<typeof NavigationMenu.Item> {
  label?: ReactNode;
}

export interface NavigationBlockItemProps
  extends ComponentPropsWithoutRef<typeof NavigationMenu.Link> {
  href: string;
}

export type NavigationMenuContentProps = ComponentPropsWithoutRef<typeof NavigationMenu.Content>;

export interface NavigationLogoItemProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface NavigationLogoLinkProps
  extends ComponentPropsWithoutRef<typeof NavigationMenu.Link> {
  children?: ReactNode;
  href: string;
}

export interface StyledNavigationWrapperProps {
  $variant: NavigationVariant;
}
