import { clsx } from "clsx";
import { Slot } from "radix-ui";
import { forwardRef } from "react";

import { Icon } from "../Icon";
import { root } from "./link.css";
import type { LinkProps } from "./link.types";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ external = false, asChild, disabled = false, className, children, onClick, ...rest }, ref) => {
    const Component = asChild ? Slot.Root : "a";

    const disabledNativeProps =
      disabled && !asChild ? { href: undefined, role: "link" as const, tabIndex: 0 } : {};

    return (
      <Component
        ref={ref}
        {...rest}
        {...disabledNativeProps}
        className={clsx(root, className)}
        data-disabled={disabled || undefined}
        aria-disabled={disabled || undefined}
        onClick={e => {
          if (disabled) return;
          onClick?.(e);
        }}
      >
        <Slot.Slottable>{children}</Slot.Slottable>
        {external && <Icon name='external-link-line' role='img' aria-label='외부 링크' />}
      </Component>
    );
  },
);

Link.displayName = "Link";
