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
} from './navigation.styles';
import type {
  NavigationRootProps,
  NavigationListProps,
  NavigationItemProps,
  NavigationTriggerProps,
  NavigationLogoDivProps,
  NavigationLogoLinkProps,
} from './navigation.types';
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
      </StyledNavigationListWrapper>
    );
  },
);

NavigationList.displayName = 'Navigation.List';

const NavigationItem = forwardRef<HTMLLIElement, NavigationItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <NavigationMenu.Item ref={ref} {...props}>
        {children}
      </NavigationMenu.Item>
    );
  },
);

NavigationItem.displayName = 'Navigation.Item';

const NavigationTrigger = forwardRef<HTMLButtonElement, NavigationTriggerProps>(
  ({ children, ...props }, ref) => {
    return (
      <NavigationMenu.Trigger asChild {...props}>
        <LabelButton.Basic ref={ref} hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
          {children}
        </LabelButton.Basic>
      </NavigationMenu.Trigger>
    );
  },
);

NavigationTrigger.displayName = 'Navigation.Trigger';

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
  Item: NavigationItem,
  Trigger: NavigationTrigger,
  LogoDiv: NavigationLogoDiv,
  LogoLink: NavigationLogoLink,
};
