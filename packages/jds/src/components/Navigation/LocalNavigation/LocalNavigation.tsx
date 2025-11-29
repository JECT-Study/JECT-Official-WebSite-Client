import { forwardRef } from "react";

import {
  StyledLocalNavigationWrapper,
  StyledLocalNavigationRoot,
  StyledLocalNavigationButtonGroup,
  StyledLocalNavigationTitle,
} from "./localNavigation.styles";
import type {
  LocalNavigationBackButtonProps,
  LocalNavigationButtonGroupProps,
  LocalNavigationRootProps,
  LocalNavigationTitleProps,
} from "./localNavigation.types";

import { IconButton } from "../../Button/IconButton";
import { useMediaQueryFlags } from "@/hooks";

const LocalNavigationRoot = forwardRef<HTMLDivElement, LocalNavigationRootProps>(
  ({ isStretched = false, children, ...props }, ref) => {
    return (
      <StyledLocalNavigationRoot ref={ref} $isStretched={isStretched} {...props}>
        <StyledLocalNavigationWrapper>{children}</StyledLocalNavigationWrapper>
      </StyledLocalNavigationRoot>
    );
  },
);

const LocalNavigationBackButton = forwardRef<HTMLButtonElement, LocalNavigationBackButtonProps>(
  ({ ...props }, ref) => {
    const { isMobile } = useMediaQueryFlags();
    const buttonSize = isMobile ? "lg" : "xl";

    return (
      <IconButton.Basic
        ref={ref}
        icon='arrow-left-line'
        hierarchy='primary'
        size={buttonSize}
        aria-label='go to previous page'
        {...props}
      />
    );
  },
);

LocalNavigationBackButton.displayName = "LocalNavigation.BackButton";

const LocalNavigationTitle = forwardRef<HTMLDivElement, LocalNavigationTitleProps>(
  ({ as, children, ...props }, ref) => {
    return (
      <StyledLocalNavigationTitle as={as} ref={ref} {...props}>
        {children}
      </StyledLocalNavigationTitle>
    );
  },
);

LocalNavigationTitle.displayName = "LocalNavigation.Title";

const LocalNavigationButtonGroup = forwardRef<HTMLDivElement, LocalNavigationButtonGroupProps>(
  ({ extraButtonVisible = false, children, ...props }, ref) => {
    if (!extraButtonVisible) return null;

    return (
      <StyledLocalNavigationButtonGroup ref={ref} {...props}>
        {children}
      </StyledLocalNavigationButtonGroup>
    );
  },
);

LocalNavigationButtonGroup.displayName = "LocalNavigation.ButtonGroup ";

export const LocalNavigation = {
  Root: LocalNavigationRoot,
  BackButton: LocalNavigationBackButton,
  Title: LocalNavigationTitle,
  ButtonGroup: LocalNavigationButtonGroup,
};
