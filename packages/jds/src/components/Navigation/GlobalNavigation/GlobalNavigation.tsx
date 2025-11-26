import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { forwardRef } from 'react';

import {
  StyledGlobalNavigationLogoLink,
  StyledGlobalNavigationList,
  StyledGlobalNavigationRoot,
  StyledGlobalNavigationWrapper,
  StyledGlobalNavigationListWrapper,
  StyledDividerWrapper,
  StyledMobileMenuButton,
  StyledGlobalNavigationContent,
} from './globalNavigation.styles';
import type {
  GlobalNavigationRootProps,
  GlobalNavigationListProps,
  GlobalNavigationLogoItemProps,
  GlobalNavigationLogoLinkProps,
  GlobalNavigationMenuContentProps,
  GlobalNavigationTriggerProps,
} from './globalNavigation.types';
import { Divider } from '../../Divider';

const GlobalNavigationRoot = forwardRef<HTMLElement, GlobalNavigationRootProps>(
  ({ children, variant = 'empty', 'aria-label': ariaLabel = '네비게이션', ...props }, ref) => {
    return (
      <StyledGlobalNavigationWrapper $variant={variant}>
        <StyledGlobalNavigationRoot ref={ref} aria-label={ariaLabel} {...props}>
          {children}
        </StyledGlobalNavigationRoot>
      </StyledGlobalNavigationWrapper>
    );
  },
);

GlobalNavigationRoot.displayName = 'GlobalNavigation.Root';

const GlobalNavigationList = forwardRef<HTMLUListElement, GlobalNavigationListProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledGlobalNavigationListWrapper>
        <StyledGlobalNavigationList ref={ref} {...props}>
          {children}
        </StyledGlobalNavigationList>
        <StyledMobileMenuButton
          hierarchy='primary'
          icon='menu-line'
          size='lg'
          aria-label='메뉴 열기'
        />
      </StyledGlobalNavigationListWrapper>
    );
  },
);

GlobalNavigationList.displayName = 'GlobalNavigation.List';

const GlobalNavigationItem = NavigationMenu.Item;
GlobalNavigationItem.displayName = 'GlobalNavigation.Item';

const GlobalNavigationTrigger = forwardRef<HTMLButtonElement, GlobalNavigationTriggerProps>(
  ({ asChild = true, ...props }, ref) => {
    return <NavigationMenu.Trigger ref={ref} asChild={asChild} {...props} />;
  },
);

GlobalNavigationTrigger.displayName = 'GlobalNavigation.Trigger';

const GlobalNavigationLink = NavigationMenu.Link;
GlobalNavigationLink.displayName = 'GlobalNavigation.Link';

const GlobalNavigationDivider = () => {
  return (
    <StyledDividerWrapper>
      <Divider thickness='normal' orientation='vertical' variant='solid' />
    </StyledDividerWrapper>
  );
};

const GlobalNavigationLogoLink = forwardRef<HTMLAnchorElement, GlobalNavigationLogoLinkProps>(
  ({ children, href, 'aria-label': ariaLabel = '홈으로 이동', ...props }, ref) => {
    return (
      <StyledGlobalNavigationLogoLink href={href} ref={ref} aria-label={ariaLabel} {...props}>
        {children}
      </StyledGlobalNavigationLogoLink>
    );
  },
);

GlobalNavigationLogoLink.displayName = 'GlobalNavigation.LogoLink';

const GlobalNavigationLogoItem = forwardRef<HTMLDivElement, GlobalNavigationLogoItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

GlobalNavigationLogoItem.displayName = 'GlobalNavigation.LogoItem';

const GlobalNavigationContent = forwardRef<HTMLDivElement, GlobalNavigationMenuContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledGlobalNavigationContent ref={ref} {...props}>
        {children}
      </StyledGlobalNavigationContent>
    );
  },
);

GlobalNavigationContent.displayName = 'GlobalNavigation.Content';

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
