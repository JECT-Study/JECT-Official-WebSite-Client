import { clsx } from "clsx";
import { forwardRef } from "react";
import { getLabelClassName } from "utils";

import * as styles from "./item.css";
import type { ItemProps } from "./item.types";

import { getActiveDescendantItemProps } from "@/hooks/useActiveDescendant";

/**
 * @description TimePicker 열의 항목 한 칸
 *
 * @remarks
 * 포커스를 받지 않는 항목입니다. 포커스는 열(`listbox`)에 두고 `aria-activedescendant`로 이 항목을 가리킵니다.
 * @internal
 * @name Item
 * @tag div
 * @role option
 */
export const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    { value, label, selected = false, active = false, disabled = false, className, ...restProps },
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        {...restProps}
        role='option'
        aria-selected={selected}
        aria-disabled={disabled || undefined}
        {...getActiveDescendantItemProps({ value, disabled })}
        data-active={active || undefined}
        data-part='root'
        className={clsx(
          styles.root({ selected, disabled }),
          getLabelClassName({ size: "md", weight: "normal" }),
          className,
        )}
      >
        {label}
      </div>
    );
  },
);

Item.displayName = "TimePicker.Item";
