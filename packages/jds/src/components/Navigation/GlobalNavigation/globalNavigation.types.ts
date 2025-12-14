import type * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type GlobalNavigationVariant = "empty" | "solid";
export type GlobalNavigationVariantAlign = "left" | "center" | "right";

export interface GlobalNavigationRootProps extends NavigationMenu.NavigationMenuProps {
  variant?: GlobalNavigationVariant;
}

export interface GlobalNavigationListProps extends NavigationMenu.NavigationMenuListProps {
  align?: GlobalNavigationVariantAlign;
}

export interface GlobalNavigationToggleItemProps extends NavigationMenu.NavigationMenuItemProps {
  label?: ReactNode;
}

export interface GlobalNavigationBlockItemProps extends NavigationMenu.NavigationMenuLinkProps {
  href: string;
}

export type GlobalNavigationTriggerProps = NavigationMenu.NavigationMenuTriggerProps;

export interface GlobalNavigationMenuContentProps
  extends NavigationMenu.NavigationMenuContentProps {
  offset?: number;
}

export interface GlobalNavigationLogoItemProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

export interface GlobalNavigationLogoLinkProps extends NavigationMenu.NavigationMenuLinkProps {
  children?: ReactNode;
  href: string;
}

export interface StyledGlobalNavigationWrapperProps {
  $variant: GlobalNavigationVariant;
}

export interface StyledGlobalNavigationListWrapperProps {
  $align: GlobalNavigationVariantAlign;
}

export interface StyledGlobalNavigationContentProps {
  $offset: number;
}
