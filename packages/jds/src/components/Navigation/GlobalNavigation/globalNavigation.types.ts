import type * as NavigationMenu from '@radix-ui/react-navigation-menu';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type GlobalNavigationVariant = 'empty' | 'solid';

export interface GlobalNavigationRootProps extends NavigationMenu.NavigationMenuProps {
  variant?: GlobalNavigationVariant;
  'aria-label'?: string;
}

export type GlobalNavigationListProps = NavigationMenu.NavigationMenuListProps;

export interface GlobalNavigationToggleItemProps extends NavigationMenu.NavigationMenuItemProps {
  label?: ReactNode;
}

export interface GlobalNavigationBlockItemProps extends NavigationMenu.NavigationMenuLinkProps {
  href: string;
}

export type GlobalNavigationTriggerProps = NavigationMenu.NavigationMenuTriggerProps;

export type GlobalNavigationMenuContentProps = NavigationMenu.NavigationMenuContentProps;

export interface GlobalNavigationLogoItemProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface GlobalNavigationLogoLinkProps extends NavigationMenu.NavigationMenuLinkProps {
  children?: ReactNode;
  href: string;
  'aria-label'?: string;
}

export interface StyledGlobalNavigationWrapperProps {
  $variant: GlobalNavigationVariant;
}
