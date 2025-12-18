import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { forwardRef } from "react";

import {
  StyledGlobalNavigationLogoLink,
  StyledGlobalNavigationList,
  StyledGlobalNavigationRoot,
  StyledGlobalNavigationWrapper,
  StyledGlobalNavigationListWrapper,
  StyledDividerWrapper,
  StyledMobileMenuButton,
  StyledGlobalNavigationContent,
  StyledGlobalNavigationItem,
} from "./globalNavigation.styles";
import type {
  GlobalNavigationRootProps,
  GlobalNavigationListProps,
  GlobalNavigationLogoItemProps,
  GlobalNavigationLogoLinkProps,
  GlobalNavigationMenuContentProps,
  GlobalNavigationTriggerProps,
  GlobalNavigationItemProps,
} from "./globalNavigation.types";
import { Divider } from "../../Divider";

const GlobalNavigationRoot = forwardRef<HTMLElement, GlobalNavigationRootProps>(
  ({ children, variant = "empty", ...props }, ref) => {
    return (
      <StyledGlobalNavigationWrapper $variant={variant}>
        <StyledGlobalNavigationRoot ref={ref} {...props}>
          {children}
          <StyledMobileMenuButton
            hierarchy='primary'
            icon='menu-line'
            size='lg'
            aria-label='MenuButton'
          />
        </StyledGlobalNavigationRoot>
      </StyledGlobalNavigationWrapper>
    );
  },
);

GlobalNavigationRoot.displayName = "GlobalNavigation.Root";

const GlobalNavigationList = forwardRef<HTMLUListElement, GlobalNavigationListProps>(
  ({ children, align = "left", ...props }, ref) => {
    return (
      <StyledGlobalNavigationListWrapper $align={align}>
        <StyledGlobalNavigationList ref={ref} role='list' {...props}>
          {children}
        </StyledGlobalNavigationList>
      </StyledGlobalNavigationListWrapper>
    );
  },
);

GlobalNavigationList.displayName = "GlobalNavigation.List";

const GlobalNavigationItem = forwardRef<HTMLLIElement, GlobalNavigationItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledGlobalNavigationItem ref={ref} {...props}>
        {children}
      </StyledGlobalNavigationItem>
    );
  },
);
GlobalNavigationItem.displayName = "GlobalNavigation.Item";

const GlobalNavigationTrigger = forwardRef<HTMLButtonElement, GlobalNavigationTriggerProps>(
  ({ asChild = true, ...props }, ref) => {
    return <NavigationMenu.Trigger ref={ref} asChild={asChild} {...props} />;
  },
);

GlobalNavigationTrigger.displayName = "GlobalNavigation.Trigger";

const GlobalNavigationLink = NavigationMenu.Link;
GlobalNavigationLink.displayName = "GlobalNavigation.Link";

const GlobalNavigationDivider = () => {
  return (
    <StyledDividerWrapper>
      <Divider thickness='normal' orientation='vertical' variant='solid' />
    </StyledDividerWrapper>
  );
};

const GlobalNavigationLogoLink = forwardRef<HTMLAnchorElement, GlobalNavigationLogoLinkProps>(
  ({ children, href, ...props }, ref) => {
    return (
      <StyledGlobalNavigationLogoLink href={href} ref={ref} {...props}>
        {children}
      </StyledGlobalNavigationLogoLink>
    );
  },
);

GlobalNavigationLogoLink.displayName = "GlobalNavigation.LogoLink";

const GlobalNavigationLogoItem = forwardRef<HTMLDivElement, GlobalNavigationLogoItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

GlobalNavigationLogoItem.displayName = "GlobalNavigation.LogoItem";

const GlobalNavigationContent = forwardRef<HTMLDivElement, GlobalNavigationMenuContentProps>(
  ({ children, offset = 0, ...props }, ref) => {
    return (
      <StyledGlobalNavigationContent ref={ref} $offset={offset} {...props}>
        {children}
      </StyledGlobalNavigationContent>
    );
  },
);

GlobalNavigationContent.displayName = "GlobalNavigation.Content";

export const GlobalNavigation = {
  Root: GlobalNavigationRoot,
  List: GlobalNavigationList,
  Item: GlobalNavigationItem,
  Trigger: GlobalNavigationTrigger,
  Link: GlobalNavigationLink,
  LogoItem: GlobalNavigationLogoItem,
  LogoLink: GlobalNavigationLogoLink,
  Divider: GlobalNavigationDivider,
  Content: GlobalNavigationContent,
};
