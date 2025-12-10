import styled from "@emotion/styled";
import { DropdownMenu } from "radix-ui";
import { shadow } from "utils";

import type { StyledDropdownMenuContentProps, StyledMenuGroupProps } from "./menu.types";
import { menuContentMap, menuGroupSizeMap } from "./menu.variants";

import { Label } from "@/components/Label";

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

export const StyledMenuCategory = styled(Label)(({ theme }) => {
  return {
    color: theme.color.semantic.object.alternative,
  };
});

export const StyledMenuGroup = styled("ul")<StyledMenuGroupProps>(({ $size, theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    ...menuGroupSizeMap(theme)[$size],
  };
});
