import type * as NavigationMenu from '@radix-ui/react-navigation-menu';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type NavigationVariant = 'empty' | 'solid';

export interface NavigationRootProps extends NavigationMenu.NavigationMenuProps {
  variant?: NavigationVariant;
}

export type NavigationListProps = NavigationMenu.NavigationMenuListProps;

export interface NavigationToggleItemProps extends NavigationMenu.NavigationMenuItemProps {
  label?: ReactNode;
}

export interface NavigationBlockItemProps extends NavigationMenu.NavigationMenuLinkProps {
  href: string;
}

export type NavigationTriggerProps = NavigationMenu.NavigationMenuTriggerProps;

export type NavigationMenuContentProps = NavigationMenu.NavigationMenuContentProps;

export interface NavigationLogoItemProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface NavigationLogoLinkProps extends NavigationMenu.NavigationMenuLinkProps {
  children?: ReactNode;
  href: string;
}

export interface StyledNavigationWrapperProps {
  $variant: NavigationVariant;
}
