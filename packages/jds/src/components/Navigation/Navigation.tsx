import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { forwardRef } from 'react';

import {
  StyledNavigationLogoLink,
  StyledNavigationList,
  StyledNavigationRoot,
  StyledNavigationWrapper,
  StyledNavigationListWrapper,
  StyledDividerWrapper,
  StyledMobileMenuButton,
  StyledNavigationContent,
} from './navigation.styles';
import type {
  NavigationRootProps,
  NavigationListProps,
  NavigationLogoItemProps,
  NavigationLogoLinkProps,
  NavigationMenuContentProps,
} from './navigation.types';
import { Divider } from '../Divider';

const NavigationRoot = forwardRef<HTMLElement, NavigationRootProps>(
  ({ children, variant = 'empty', ...props }, ref) => {
    return (
      <StyledNavigationWrapper $variant={variant}>
        <StyledNavigationRoot ref={ref} {...props}>
          {children}
        </StyledNavigationRoot>
      </StyledNavigationWrapper>
    );
  },
);

NavigationRoot.displayName = 'Navigation.Root';

const NavigationList = forwardRef<HTMLUListElement, NavigationListProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledNavigationListWrapper>
        <StyledNavigationList ref={ref} {...props}>
          {children}
        </StyledNavigationList>
        <StyledMobileMenuButton hierarchy='primary' icon='menu-line' size='lg' />
      </StyledNavigationListWrapper>
    );
  },
);

NavigationList.displayName = 'Navigation.List';

const NavigationItem = NavigationMenu.Item;
NavigationItem.displayName = 'Navigation.Item';

const NavigationTrigger = NavigationMenu.Trigger;
NavigationTrigger.displayName = 'Navigation.Trigger';

const NavigationLink = NavigationMenu.Link;
NavigationLink.displayName = 'Navigation.Link';

const NavigationDivider = () => {
  return (
    <StyledDividerWrapper>
      <Divider thickness='normal' orientation='vertical' variant='solid' />
    </StyledDividerWrapper>
  );
};

const NavigationLogoLink = forwardRef<HTMLAnchorElement, NavigationLogoLinkProps>(
  ({ children, href, ...props }, ref) => {
    return (
      <StyledNavigationLogoLink href={href} ref={ref} {...props}>
        {children}
      </StyledNavigationLogoLink>
    );
  },
);

NavigationLogoLink.displayName = 'Navigation.LogoLink';

const NavigationLogoItem = forwardRef<HTMLDivElement, NavigationLogoItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

NavigationLogoItem.displayName = 'Navigation.LogoItem';

const NavigationContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledNavigationContent ref={ref} {...props}>
        {children}
      </StyledNavigationContent>
    );
  },
);

NavigationContent.displayName = 'Navigation.Content';

export const Navigation = {
  Root: NavigationRoot,
  List: NavigationList,
  Item: NavigationItem,
  Trigger: NavigationTrigger,
  Link: NavigationLink,
  LogoItem: NavigationLogoItem,
  LogoLink: NavigationLogoLink,
  Divider: NavigationDivider,
  Content: NavigationContent,
};
