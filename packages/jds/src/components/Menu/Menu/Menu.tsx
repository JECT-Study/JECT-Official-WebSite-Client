import { DropdownMenu } from "radix-ui";
import { forwardRef } from "react";

import { StyledDropdownMenuContent, StyledMenuCategory, StyledMenuGroup } from "./Menu.styles";
import type {
  MenuAnchorProps,
  MenuButtonProps,
  MenuCategoryProps,
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuRootProps,
} from "./menu.types";
import { menuCategorySizeMap } from "./menu.variants";
import { MenuContext, useMenuContext } from "./menuContext";
import { MenuItem } from "../MenuItem";

const MenuRoot = ({ children, menuStyle = "solid", size = "md", ...rest }: MenuRootProps) => {
  return (
    <MenuContext.Provider value={{ menuStyle, size }}>
      <DropdownMenu.Root {...rest}>{children}</DropdownMenu.Root>
    </MenuContext.Provider>
  );
};

MenuRoot.displayName = "Menu.Root";

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(({ children, ...rest }, ref) => {
  const { menuStyle, size } = useMenuContext();

  return (
    <StyledDropdownMenuContent ref={ref} $menuStyle={menuStyle} $size={size} {...rest}>
      {children}
    </StyledDropdownMenuContent>
  );
});

MenuContent.displayName = "Menu.Content";

const MenuCategory = forwardRef<HTMLDivElement, MenuCategoryProps>(({ children, ...rest }, ref) => {
  const { size } = useMenuContext();
  const labelSize = menuCategorySizeMap[size];

  return (
    <StyledMenuCategory
      ref={ref}
      as='span'
      textAlign='left'
      size={labelSize}
      weight='normal'
      {...rest}
    >
      {children}
    </StyledMenuCategory>
  );
});

MenuCategory.displayName = "Menu.Category";

const MenuGroup = forwardRef<HTMLUListElement, MenuGroupProps>(({ children, ...rest }, ref) => {
  const { size } = useMenuContext();

  return (
    <StyledMenuGroup ref={ref} role='list' $size={size} {...rest}>
      {children}
    </StyledMenuGroup>
  );
});

MenuGroup.displayName = "Menu.Group";

const MenuGroupItem = forwardRef<HTMLLIElement, MenuItemProps>(({ children, ...rest }, ref) => {
  return (
    <DropdownMenu.Item asChild {...rest}>
      <li ref={ref}>{children}</li>
    </DropdownMenu.Item>
  );
});

MenuGroupItem.displayName = "Menu.GroupItem";

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(({ children, ...rest }, ref) => {
  const { size } = useMenuContext();

  return (
    <MenuItem.Button ref={ref} size={size} {...rest}>
      {children}
    </MenuItem.Button>
  );
});

const MenuAnchor = forwardRef<HTMLAnchorElement, MenuAnchorProps>(({ children, ...rest }, ref) => {
  const { size } = useMenuContext();

  return (
    <MenuItem.Anchor ref={ref} size={size} {...rest}>
      {children}
    </MenuItem.Anchor>
  );
});

export const Menu = {
  Root: MenuRoot,
  Trigger: DropdownMenu.Trigger,
  Content: MenuContent,
  Category: MenuCategory,
  Group: MenuGroup,
  GroupItem: MenuGroupItem,
  Button: MenuButton,
  Anchor: MenuAnchor,
};
