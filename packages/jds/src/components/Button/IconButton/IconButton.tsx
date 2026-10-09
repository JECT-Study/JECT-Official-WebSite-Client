import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";
import { Slot } from "radix-ui";
import { cloneElement, forwardRef, isValidElement, useEffect, type ReactNode } from "react";

import * as styles from "./iconButton.css";
import type { IconButtonProps } from "./iconButton.types";
import { Icon } from "../../Icon";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      asChild = false,
      children,
      icon,
      size = "md",
      hierarchy = "primary",
      condensed = true,
      disabled = false,
      accentColor,
      className,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const accentStyle = accentColor
      ? assignInlineVars({
          [styles.iconButtonAccentColor]: accentColor.normal,
          [styles.iconButtonAccentDisabledColor]: accentColor.disabled ?? accentColor.normal,
        })
      : undefined;

    // IconButton은 아이콘만 렌더링하므로 asChild로 전달한 요소의 children은 비운다.
    const childElement =
      asChild && isValidElement<{ children?: ReactNode }>(children) ? children : null;
    // 렌더링될 값과 관계없이 children을 넘기는 코드 자체를 사용 실수로 보고 경고한다.
    const hasIgnoredChildren = childElement != null && "children" in childElement.props;

    useEffect(() => {
      if (process.env.NODE_ENV === "production" || !hasIgnoredChildren) return;

      console.warn(
        "IconButton은 아이콘만 렌더링하므로 asChild로 전달한 요소의 children은 무시됩니다. 요소는 비워서 전달하고, 접근 이름은 aria-label로 지정하세요.",
      );
    }, [hasIgnoredChildren]);

    const Component = asChild ? Slot.Root : "button";
    const nativeButtonProps = asChild ? {} : { type: "button" as const, disabled };

    return (
      <Component
        ref={forwardedRef}
        {...nativeButtonProps}
        {...restProps}
        data-disabled={disabled || undefined}
        data-part='root'
        className={clsx(styles.root({ hierarchy, size, condensed }), className)}
        style={{ ...accentStyle, ...style }}
      >
        {asChild && (
          <Slot.Slottable>
            {childElement ? cloneElement(childElement, { children: undefined }) : children}
          </Slot.Slottable>
        )}
        <Icon name={icon} size={size} className={styles.icon} />
      </Component>
    );
  },
);

IconButton.displayName = "IconButton";
