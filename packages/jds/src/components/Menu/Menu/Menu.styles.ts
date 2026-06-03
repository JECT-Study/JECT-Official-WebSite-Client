import styled from "@emotion/styled";
import { DropdownMenu } from "radix-ui";
import { shadow } from "utils";

import type { StyledDropdownMenuContentProps, StyledMenuGroupProps } from "./menu.types";
import { menuContentMap, menuGroupSizeMap } from "./menu.variants";

import { shouldForwardTypographyProp } from "@/utils/typography";

export const StyledDropdownMenuContent = styled(
  DropdownMenu.Content,
)<StyledDropdownMenuContentProps>(({ theme, $menuStyle, $size }) => {
  const shadowStyle = $menuStyle === "solid" ? shadow(theme, "floated") : {};
  return {
    display: "flex",
    flexDirection: "column",
    ...shadowStyle,
    ...menuContentMap(theme)[$menuStyle][$size],
  };
});

export const StyledMenuCategory = styled("span", {
  shouldForwardProp: shouldForwardTypographyProp,
})(({ theme }) => {
  return {
    "&&": {
      color: theme.color.semantic.object.alternative,
    },
  };
});

export const StyledMenuGroup = styled("ul")<StyledMenuGroupProps>(({ $size, theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    ...menuGroupSizeMap(theme)[$size],
  };
});
