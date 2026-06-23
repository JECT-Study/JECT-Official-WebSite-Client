import { clsx } from "clsx";
import { DropdownMenu } from "radix-ui";
import { forwardRef } from "react";

import {
  menuCategory,
  menuCategoryContainer,
  menuContent,
  menuGroup,
  menuGroupSelector,
} from "./menu.css";
import type {
  MenuAnchorProps,
  MenuButtonProps,
  MenuCategoryProps,
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuRootProps,
  MenuSize,
} from "./menu.types";
import { MenuContext, useMenuContext } from "./menuContext";
import { MenuItem } from "../MenuItem";

import { getLabelClassName, type LabelSize } from "@/utils/typography";

const MenuRoot = ({ children, menuStyle = "solid", size = "md", ...rest }: MenuRootProps) => {
  return (
    <MenuContext.Provider value={{ menuStyle, size }}>
      <DropdownMenu.Root {...rest}>{children}</DropdownMenu.Root>
    </MenuContext.Provider>
  );
};

MenuRoot.displayName = "Menu.Root";

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const { menuStyle, size } = useMenuContext("Menu.Content");

    return (
      <DropdownMenu.Content
        ref={ref}
        className={clsx(menuContent({ menuStyle, size }), className)}
        {...restProps}
      >
        {children}
      </DropdownMenu.Content>
    );
  },
);

MenuContent.displayName = "Menu.Content";

const MenuCategory = forwardRef<HTMLDivElement, MenuCategoryProps>((props, ref) => {
  const { size: labelSizeFromProps, textAlign, weight, cursor, as, children, ...restProps } = props;
  const { size: menuSizeFromCtx } = useMenuContext("Menu.Category");
  const labelSize = labelSizeFromProps ?? labelSizeByMenuSizeMap[menuSizeFromCtx];

  const Component = as ?? "div";

  return (
    <div className={menuCategoryContainer({ size: menuSizeFromCtx })}>
      <Component
        ref={ref}
        className={clsx(
          getLabelClassName({ size: labelSize, textAlign, weight, cursor }),
          menuCategory,
        )}
        {...restProps}
      >
        {children}
      </Component>
    </div>
  );
});

const labelSizeByMenuSizeMap: Record<MenuSize, LabelSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
} as const;

MenuCategory.displayName = "Menu.Category";

const MenuGroup = forwardRef<HTMLUListElement, MenuGroupProps>(
  ({ children, className, ...restProps }, ref) => {
    const { size } = useMenuContext("Menu.Group");

    return (
      <ul
        ref={ref}
        className={clsx(menuGroup({ size }), menuGroupSelector, className)}
        {...restProps}
      >
        {children}
      </ul>
    );
  },
);

MenuGroup.displayName = "Menu.Group";

const MenuGroupItem = forwardRef<HTMLLIElement, MenuItemProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <DropdownMenu.Item asChild {...restProps}>
        <li ref={ref}>{children}</li>
      </DropdownMenu.Item>
    );
  },
);

MenuGroupItem.displayName = "Menu.GroupItem";

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ children, ...restProps }, ref) => {
    const { size } = useMenuContext("Menu.Button");

    return (
      <MenuItem.Button ref={ref} size={size} {...restProps}>
        {children}
      </MenuItem.Button>
    );
  },
);

MenuButton.displayName = "Menu.Button";

const MenuAnchor = forwardRef<HTMLAnchorElement, MenuAnchorProps>(
  ({ children, ...restProps }, ref) => {
    const { size } = useMenuContext("Menu.Anchor");

    return (
      <MenuItem.Anchor ref={ref} size={size} {...restProps}>
        {children}
      </MenuItem.Anchor>
    );
  },
);

MenuAnchor.displayName = "Menu.Anchor";

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
