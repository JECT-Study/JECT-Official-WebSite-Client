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
  StyledDesktopView,
  StyledTabletView,
  StyledNavigationBlockLink,
} from './navigation.styles';
import type {
  NavigationRootProps,
  NavigationListProps,
  NavigationToggleItemProps,
  NavigationBlockItemProps,
  NavigationLogoItemProps,
  NavigationLogoLinkProps,
} from './navigation.types';
import { LabelButton } from '../Button/LabelButton';
import { Divider } from '../Divider';
// TODO: 로컬 네비게이션 만들어야됌

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

const NavigationToggleItem = forwardRef<HTMLLIElement, NavigationToggleItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <NavigationMenu.Item ref={ref} {...props}>
        <StyledDesktopView>
          <NavigationMenu.Trigger asChild>
            <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
              {children}
            </LabelButton.Basic>
          </NavigationMenu.Trigger>
        </StyledDesktopView>
        <StyledTabletView>
          <NavigationMenu.Trigger asChild>
            <LabelButton.Basic hierarchy='primary' size='xs' suffixIcon='arrow-down-s-line'>
              {children}
            </LabelButton.Basic>
          </NavigationMenu.Trigger>
        </StyledTabletView>
      </NavigationMenu.Item>
    );
  },
);

NavigationToggleItem.displayName = 'Navigation.ToggleItem';

const NavigationBlockItem = forwardRef<HTMLAnchorElement, NavigationBlockItemProps>(
  ({ children, href, ...props }, ref) => {
    // TODO: BlockButton as props 지원과 같이 a 태그로 변환이 가능해지면 대체하기
    return (
      <NavigationMenu.Item>
        <StyledDesktopView>
          <StyledNavigationBlockLink href={href} ref={ref} $size='sm' {...props}>
            {children}
          </StyledNavigationBlockLink>
        </StyledDesktopView>
        <StyledTabletView>
          <StyledNavigationBlockLink href={href} $size='xs' {...props}>
            {children}
          </StyledNavigationBlockLink>
        </StyledTabletView>
      </NavigationMenu.Item>
    );
  },
);

NavigationBlockItem.displayName = 'Navigation.BlockItem';

const NavigationLogoLink = forwardRef<HTMLAnchorElement, NavigationLogoLinkProps>(
  ({ children, href, ...props }, ref) => {
    return (
      <>
        <StyledNavigationLogoLink href={href} ref={ref} {...props}>
          {children}
        </StyledNavigationLogoLink>
        <StyledDividerWrapper>
          <Divider thickness='normal' orientation='vertical' variant='solid' />
        </StyledDividerWrapper>
      </>
    );
  },
);

NavigationLogoLink.displayName = 'Navigation.LogoLink';

const NavigationLogoItem = forwardRef<HTMLDivElement, NavigationLogoItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <>
        <div ref={ref} {...props}>
          {children}
        </div>
        <StyledDividerWrapper>
          <Divider thickness='normal' orientation='vertical' variant='solid' />
        </StyledDividerWrapper>
      </>
    );
  },
);

NavigationLogoItem.displayName = 'Navigation.LogoItem';

export const Navigation = {
  Root: NavigationRoot,
  List: NavigationList,
  ToggleItem: NavigationToggleItem,
  BlockItem: NavigationBlockItem,
  LogoItem: NavigationLogoItem,
  LogoLink: NavigationLogoLink,
};
