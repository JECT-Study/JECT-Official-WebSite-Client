import { clsx } from "clsx";
import { DropdownMenu } from "radix-ui";
import { Children, forwardRef, useId, useState } from "react";

import {
  menuCategory,
  menuCategoryContainer,
  menuContent,
  menuGroup,
  menuTreeContainer,
  menuTreeContent,
  menuTreeIconButton,
  menuTreeTrigger,
} from "./menu.css";
import type {
  MenuAnchorProps,
  MenuButtonProps,
  MenuCategoryProps,
  MenuContentProps,
  MenuGroupProps,
  MenuRootProps,
  MenuSize,
  MenuTreeProps,
} from "./menu.types";
import { MenuContext, useMenuContext } from "./menuContext";
import { MenuItem } from "../MenuItem";

import { IconButton } from "@/components/Button/IconButton";
import type { IconButtonSize } from "@/components/Button/IconButton/iconButton.types";
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
  const { size: labelSizeFromProps, weight, as, children, ...restProps } = props;
  const { size: menuSizeFromCtx } = useMenuContext("Menu.Category");
  const labelSize = labelSizeFromProps ?? labelSizeByMenuSizeMap[menuSizeFromCtx];

  const Component = as ?? "div";

  return (
    <div className={menuCategoryContainer({ size: menuSizeFromCtx })}>
      <Component
        ref={ref}
        className={clsx(getLabelClassName({ size: labelSize, weight }), menuCategory)}
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
      <ul role='list' ref={ref} className={clsx(menuGroup({ size }), className)} {...restProps}>
        {children}
      </ul>
    );
  },
);

MenuGroup.displayName = "Menu.Group";

const MenuTree = forwardRef<HTMLButtonElement, MenuTreeProps>(
  (
    {
      label,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      onKeyDown,
      disabled = false,
      children,
      withTreeButton,
      ...restProps
    },
    ref,
  ) => {
    const { size } = useMenuContext("Menu.Tree");

    const [isInternalOpen, setIsInternalOpen] = useState(defaultOpen);

    const isControlled = openProp !== undefined;
    const isOpen = isControlled ? openProp : isInternalOpen;

    const menuTreeId = useId();

    const setOpen = (isNextOpen: boolean) => {
      if (disabled) return;
      if (!isControlled) setIsInternalOpen(isNextOpen);
      onOpenChange?.(isNextOpen);
    };

    const hasChildren = Children.toArray(children).length > 0;

    const handleToggle = () => {
      if (!hasChildren) return;
      setOpen(!isOpen);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);

      if (disabled || !hasChildren) return;
      if (event.key === "ArrowRight" && !isOpen) {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "ArrowLeft" && isOpen) {
        event.preventDefault();
        setOpen(false);
      }
    };

    const hasTreeButton = withTreeButton ?? hasChildren;

    return (
      <li className={menuTreeContainer({ size })}>
        <div className={menuTreeTrigger}>
          <IconButton
            className={menuTreeIconButton({ hasTreeButton })}
            icon={isOpen ? "chevron-down" : "chevron-right"}
            size={menuTreeIconSizeByMenuSize[size]}
            disabled={disabled}
            condensed
            tabIndex={-1}
            aria-label={isOpen ? "접기" : "펼치기"}
            onClick={handleToggle}
          />
          <DropdownMenu.Item
            asChild
            disabled={disabled}
            aria-expanded={hasChildren ? isOpen : undefined}
            aria-controls={hasChildren ? menuTreeId : undefined}
          >
            <MenuItem.Button
              ref={ref}
              size={size}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              {...restProps}
            >
              {label}
            </MenuItem.Button>
          </DropdownMenu.Item>
        </div>
        {isOpen && hasChildren && (
          <ul id={menuTreeId} className={menuTreeContent}>
            {children}
          </ul>
        )}
      </li>
    );
  },
);

const menuTreeIconSizeByMenuSize: Record<MenuSize, IconButtonSize> = {
  lg: "lg",
  md: "md",
  sm: "xs",
} as const;

MenuTree.displayName = "Menu.Tree";

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ children, disabled, onSelect, textValue, ...restProps }, ref) => {
    const { size } = useMenuContext("Menu.Button");

    return (
      <li>
        <DropdownMenu.Item asChild disabled={disabled} onSelect={onSelect} textValue={textValue}>
          <MenuItem.Button ref={ref} size={size} disabled={disabled} {...restProps}>
            {children}
          </MenuItem.Button>
        </DropdownMenu.Item>
      </li>
    );
  },
);

MenuButton.displayName = "Menu.Button";

const MenuAnchor = forwardRef<HTMLAnchorElement, MenuAnchorProps>(
  ({ children, disabled, onSelect, textValue, ...restProps }, ref) => {
    const { size } = useMenuContext("Menu.Anchor");

    return (
      <li>
        <DropdownMenu.Item asChild disabled={disabled} onSelect={onSelect} textValue={textValue}>
          <MenuItem.Anchor ref={ref} size={size} disabled={disabled} {...restProps}>
            {children}
          </MenuItem.Anchor>
        </DropdownMenu.Item>
      </li>
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
  Tree: MenuTree,
  Button: MenuButton,
  Anchor: MenuAnchor,
};
