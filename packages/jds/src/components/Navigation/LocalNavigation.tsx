import { forwardRef } from 'react';

import {
  StyledLocalNavigationWrapper,
  StyledLocalNavigationRoot,
  StyledLocalNavigationButtonGroup,
  StyledLocalNavigationTitle,
} from './localNavigation.styles';
import type {
  LocalNavigationButtonGroupProps,
  LocalNavigationRootProps,
  LocalNavigationTitleProps,
} from './localNavigation.types';

import { IconButton } from '@/components';
import { useMediaQueryFlags } from '@/hooks';

const LocalNavigationRoot = forwardRef<HTMLDivElement, LocalNavigationRootProps>(
  ({ isStretched = false, children, ...props }, ref) => {
    const { isMobile } = useMediaQueryFlags();
    const buttonSize = isMobile ? 'lg' : 'xl';

    return (
      <StyledLocalNavigationRoot ref={ref} $isStretched={isStretched} {...props}>
        <StyledLocalNavigationWrapper>
          <IconButton.Basic icon='arrow-left-line' hierarchy='primary' size={buttonSize} />
          {children}
        </StyledLocalNavigationWrapper>
      </StyledLocalNavigationRoot>
    );
  },
);

const LocalNavigationTitle = forwardRef<HTMLDivElement, LocalNavigationTitleProps>(
  ({ as, children, ...props }, ref) => {
    return (
      <StyledLocalNavigationTitle as={as} ref={ref} {...props}>
        {children}
      </StyledLocalNavigationTitle>
    );
  },
);

LocalNavigationTitle.displayName = 'LocalNavigation.Title';

const LocalNavigationButtonGroup = forwardRef<HTMLDivElement, LocalNavigationButtonGroupProps>(
  ({ extraButtonVisible = false, children, ...props }, ref) => {
    if (!extraButtonVisible) return <></>;

    return (
      <StyledLocalNavigationButtonGroup ref={ref} {...props}>
        {children}
      </StyledLocalNavigationButtonGroup>
    );
  },
);

LocalNavigationButtonGroup.displayName = 'LocalNavigation.ButtonGroup ';

export const LocalNavigation = Object.assign(LocalNavigationRoot, {
  Title: LocalNavigationTitle,
  ButtonGroup: LocalNavigationButtonGroup,
});
