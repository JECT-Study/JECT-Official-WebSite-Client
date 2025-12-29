import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { pxToRem } from "utils";

import type {
  StyledGlobalNavigationContentProps,
  StyledGlobalNavigationListWrapperProps,
  StyledGlobalNavigationWrapperProps,
} from "./globalNavigation.types";
import { IconButton } from "../../Button/IconButton";

const globalNavigationStyleMap = (theme: Theme) => ({
  empty: {
    backgroundColor: "transparent",
    borderBottom: "none",
  },
  solid: {
    backgroundColor: theme.color.semantic.surface.shallow,
    borderBottom: `1px solid ${theme.color.semantic.stroke.subtle}`,
  },
});

export const StyledGlobalNavigationWrapper = styled.div<StyledGlobalNavigationWrapperProps>(
  ({ theme, $variant }) => {
    const globalNavigationStyles = globalNavigationStyleMap(theme)[$variant];

    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      padding: `${theme.scheme.semantic.spacing[12]} ${theme.scheme.semantic.margin.lg}`,
      ...globalNavigationStyles,

      [theme.breakPoint.tablet]: {
        justifyContent: "flex-start",
        padding: `${theme.scheme.semantic.spacing[10]} ${theme.scheme.semantic.margin.lg}`,
      },

      [theme.breakPoint.mobile]: {
        justifyContent: "flex-start",
        padding: `${theme.scheme.semantic.margin.sm} ${theme.scheme.semantic.margin.lg}`,
      },
    };
  },
);

export const StyledGlobalNavigationRoot = styled(NavigationMenu.Root)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  gap: theme.scheme.semantic.spacing[24],
  width: pxToRem(922),
  height: pxToRem(32),

  [theme.breakPoint.tablet]: {
    width: pxToRem(728),
    height: pxToRem(26),
    gap: theme.scheme.semantic.spacing[20],
  },

  [theme.breakPoint.mobile]: {
    height: pxToRem(20),
    gap: "none",
  },
}));

const AlignMap = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
} as const;

export const StyledGlobalNavigationListWrapper = styled.div<StyledGlobalNavigationListWrapperProps>`
  display: flex;
  justify-content: ${({ $align }) => AlignMap[$align]};
  flex: 1;

  & > div {
    position: static !important;
  }

  ${({ theme }) => theme.breakPoint.mobile} {
    justify-content: flex-end;
  }
`;

export const StyledGlobalNavigationList = styled(NavigationMenu.List)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.scheme.semantic.spacing[32],
  whiteSpace: "nowrap",

  [theme.breakPoint.mobile]: {
    display: "none",
    gap: theme.scheme.semantic.spacing[24],
  },
}));

export const StyledGlobalNavigationItem = styled(NavigationMenu.Item)(() => ({
  position: "relative" as const,
}));

export const StyledMobileMenuButton = styled(IconButton.Basic)(({ theme }) => ({
  display: "none",

  [theme.breakPoint.mobile]: {
    display: "inline-block",
  },
}));

export const StyledGlobalNavigationLogoLink = styled(NavigationMenu.Link)(() => ({
  textDecoration: "none",
  color: "inherit",
}));

export const StyledDividerWrapper = styled.div(({ theme }) => ({
  height: pxToRem(20),

  [theme.breakPoint.tablet]: {
    height: pxToRem(18),
  },
}));

export const StyledGlobalNavigationContent = styled(
  NavigationMenu.Content,
)<StyledGlobalNavigationContentProps>(({ $offset }) => {
  return {
    position: "absolute" as const,
    left: "50%",
    transform: "translate(-50%, 0)",
    marginTop: $offset,
  };
});
