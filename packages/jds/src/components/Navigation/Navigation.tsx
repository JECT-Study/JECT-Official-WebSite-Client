import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { forwardRef } from 'react';

import {
  StyledNavigationLogoLink,
  StyledNavigationLogoDiv,
  StyledNavigationList,
  StyledNavigationRoot,
  StyledNavigationWrapper,
  StyledSegmentedControlWrapper,
  StyledNavigationListWrapper,
  StyledDividerWrapper,
  StyledMobileMenuButton,
  StyledDesktopTrigger,
  StyledTabletTrigger,
} from './navigation.styles';
import type {
  NavigationRootProps,
  NavigationListProps,
  NavigationToggleItemProps,
  NavigationBlockItemProps,
  NavigationLogoDivProps,
  NavigationLogoLinkProps,
} from './navigation.types';
import { BlockButton } from '../Button/BlockButton';
import { IconButton } from '../Button/IconButton';
import { LabelButton } from '../Button/LabelButton';
import { Divider } from '../Divider';
import { SegmentedControl } from '../SegmentedControl';

const ThemeSwitcher = () => {
  return (
    <StyledSegmentedControlWrapper>
      <SegmentedControl.Root defaultValue='light' size='xs'>
        <SegmentedControl.Item value='light'>라이트</SegmentedControl.Item>
        <SegmentedControl.Item value='dark'>다크</SegmentedControl.Item>
      </SegmentedControl.Root>
    </StyledSegmentedControlWrapper>
  );
};

const NavigationRoot = forwardRef<HTMLElement, NavigationRootProps>(
  ({ children, variant = 'empty', ...props }, ref) => {
    return (
      <StyledNavigationWrapper $variant={variant}>
        <NavigationMenu.Root asChild {...props}>
          <StyledNavigationRoot ref={ref}>
            {children}
            {variant === 'solid' && <ThemeSwitcher />}
          </StyledNavigationRoot>
        </NavigationMenu.Root>
      </StyledNavigationWrapper>
    );
  },
);

NavigationRoot.displayName = 'Navigation.Root';

const NavigationList = forwardRef<HTMLUListElement, NavigationListProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledNavigationListWrapper>
        <NavigationMenu.List asChild {...props}>
          <StyledNavigationList ref={ref}>{children}</StyledNavigationList>
        </NavigationMenu.List>
        <StyledMobileMenuButton>
          <IconButton.Basic hierarchy='primary' icon='menu-line' size='lg' />
        </StyledMobileMenuButton>
      </StyledNavigationListWrapper>
    );
  },
);

NavigationList.displayName = 'Navigation.List';

const NavigationToggleItem = forwardRef<HTMLLIElement, NavigationToggleItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <NavigationMenu.Item ref={ref} {...props}>
        <StyledDesktopTrigger>
          <NavigationMenu.Trigger asChild>
            <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
              {children}
            </LabelButton.Basic>
          </NavigationMenu.Trigger>
        </StyledDesktopTrigger>
        <StyledTabletTrigger>
          <NavigationMenu.Trigger asChild>
            <LabelButton.Basic hierarchy='primary' size='xs' suffixIcon='arrow-down-s-line'>
              {children}
            </LabelButton.Basic>
          </NavigationMenu.Trigger>
        </StyledTabletTrigger>
      </NavigationMenu.Item>
    );
  },
);

NavigationToggleItem.displayName = 'Navigation.ToggleItem';

const NavigationBlockItem = forwardRef<HTMLLIElement, NavigationBlockItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <NavigationMenu.Item ref={ref} {...props}>
        <StyledDesktopTrigger>
          <BlockButton.Basic hierarchy='primary' size='sm' variant='solid'>
            {children}
          </BlockButton.Basic>
        </StyledDesktopTrigger>
        <StyledTabletTrigger>
          <BlockButton.Basic hierarchy='primary' size='xs' variant='solid'>
            {children}
          </BlockButton.Basic>
        </StyledTabletTrigger>
      </NavigationMenu.Item>
    );
  },
);

NavigationBlockItem.displayName = 'Navigation.BlockItem';

const NavigationLogoLink = forwardRef<HTMLAnchorElement, NavigationLogoLinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <>
        <StyledNavigationLogoLink ref={ref} {...props}>
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

const NavigationLogoDiv = forwardRef<HTMLDivElement, NavigationLogoDivProps>(
  ({ children, ...props }, ref) => {
    return (
      <>
        <StyledNavigationLogoDiv ref={ref} {...props}>
          {children}
        </StyledNavigationLogoDiv>
        <StyledDividerWrapper>
          <Divider thickness='normal' orientation='vertical' variant='solid' />
        </StyledDividerWrapper>
      </>
    );
  },
);

NavigationLogoDiv.displayName = 'Navigation.LogoDiv';

export const Navigation = {
  Root: NavigationRoot,
  List: NavigationList,
  ToggleItem: NavigationToggleItem,
  BlockItem: NavigationBlockItem,
  LogoDiv: NavigationLogoDiv,
  LogoLink: NavigationLogoLink,
};
