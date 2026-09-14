import { clsx } from "clsx";
import { DropdownMenu as RadixDropdownMenu } from "radix-ui";
import { Children, forwardRef, useId, useState } from "react";

import { MenuProvider, useMenuContext } from "./menu.context";
import {
  menuContent,
  menuTreeContainer,
  menuTreeContent,
  menuTreeIconButton,
  menuTreeTrigger,
} from "./menu.css";
import type {
  DropdownMenuAnchorProps,
  DropdownMenuButtonProps,
  DropdownMenuContentProps,
  DropdownMenuRootProps,
  DropdownMenuTreeProps,
  MenuSize,
} from "./menu.types";
import { MenuPrimitive } from "./MenuPrimitive";

import { IconButton } from "@/components/Button/IconButton";
import type { IconButtonSize } from "@/components/Button/IconButton/iconButton.types";

const DropdownMenuRoot = ({
  children,
  menuStyle = "solid",
  size = "md",
  ...restProps
}: DropdownMenuRootProps) => {
  return (
    <MenuProvider value={{ menuStyle, size }}>
      <RadixDropdownMenu.Root {...restProps}>{children}</RadixDropdownMenu.Root>
    </MenuProvider>
  );
};

DropdownMenuRoot.displayName = "DropdownMenu.Root";

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const { menuStyle, size } = useMenuContext("DropdownMenu.Content");

    return (
      <RadixDropdownMenu.Content
        ref={ref}
        className={clsx(menuContent({ menuStyle, size }), className)}
        {...restProps}
      >
        {children}
      </RadixDropdownMenu.Content>
    );
  },
);

DropdownMenuContent.displayName = "DropdownMenu.Content";

const DropdownMenuButton = forwardRef<HTMLButtonElement, DropdownMenuButtonProps>(
  ({ children, disabled, onSelect, textValue, ...restProps }, ref) => {
    const { size } = useMenuContext("DropdownMenu.Button");

    return (
      <li>
        <RadixDropdownMenu.Item
          asChild
          disabled={disabled}
          onSelect={onSelect}
          textValue={textValue}
        >
          <MenuPrimitive.Button ref={ref} size={size} disabled={disabled} {...restProps}>
            {children}
          </MenuPrimitive.Button>
        </RadixDropdownMenu.Item>
      </li>
    );
  },
);

DropdownMenuButton.displayName = "DropdownMenu.Button";

const DropdownMenuAnchor = forwardRef<HTMLAnchorElement, DropdownMenuAnchorProps>(
  ({ children, disabled, onSelect, textValue, ...restProps }, ref) => {
    const { size } = useMenuContext("DropdownMenu.Anchor");

    return (
      <li>
        <RadixDropdownMenu.Item
          asChild
          disabled={disabled}
          onSelect={onSelect}
          textValue={textValue}
        >
          <MenuPrimitive.Anchor ref={ref} size={size} disabled={disabled} {...restProps}>
            {children}
          </MenuPrimitive.Anchor>
        </RadixDropdownMenu.Item>
      </li>
    );
  },
);

DropdownMenuAnchor.displayName = "DropdownMenu.Anchor";

const DropdownMenuTree = forwardRef<HTMLButtonElement, DropdownMenuTreeProps>(
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
    const { size } = useMenuContext("DropdownMenu.Tree");

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
          <RadixDropdownMenu.Item
            asChild
            disabled={disabled}
            aria-expanded={hasChildren ? isOpen : undefined}
            aria-controls={hasChildren ? menuTreeId : undefined}
          >
            <MenuPrimitive.Button
              ref={ref}
              size={size}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              {...restProps}
            >
              {label}
            </MenuPrimitive.Button>
          </RadixDropdownMenu.Item>
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

DropdownMenuTree.displayName = "DropdownMenu.Tree";

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: RadixDropdownMenu.Trigger,
  Content: DropdownMenuContent,
  Category: MenuPrimitive.Category,
  Group: MenuPrimitive.Group,
  Tree: DropdownMenuTree,
  Button: DropdownMenuButton,
  Anchor: DropdownMenuAnchor,
};
