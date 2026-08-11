import { clsx } from "clsx";
import { type CSSProperties, forwardRef, useMemo } from "react";

import { ListboxOption } from "./compound/Option";
import * as styles from "./listbox.css";
import type { ListboxProps, SelectDimension } from "./listbox.types";
import { ListboxProvider } from "./ListboxContext";

import { getLabelClassName } from "@/utils/typography";

const resolveDimension = (value: SelectDimension) => (value === "full" ? "100%" : value);

const InternalListbox = forwardRef<HTMLDivElement, ListboxProps>(
  (
    {
      context,
      selectionMode,
      variant,
      children,
      listboxRef,
      listboxProps,
      label,
      width,
      height,
      className,
      style,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      ...restProps
    },
    ref,
  ) => {
    const { className: listboxClassName, ...restListboxProps } = listboxProps;

    const contextValue = useMemo(
      () => ({ ...context, selectionMode, variant }),
      [context, selectionMode, variant],
    );

    const labelId = `${context.listboxId}-label`;

    const containerStyle: CSSProperties = { ...style };
    if (width !== undefined) {
      containerStyle.width = resolveDimension(width);
    }
    if (height !== undefined) {
      containerStyle.height = resolveDimension(height);
    }

    return (
      <ListboxProvider value={contextValue}>
        <div
          ref={ref}
          className={clsx(styles.selectContainer, className)}
          style={containerStyle}
          {...restProps}
        >
          {label != null && (
            <span
              id={labelId}
              className={clsx(getLabelClassName({ size: "sm" }), styles.selectLabel)}
            >
              {label}
            </span>
          )}
          <div
            ref={listboxRef}
            className={clsx(styles.listbox, listboxClassName)}
            aria-label={label != null ? undefined : ariaLabel}
            aria-labelledby={label != null ? labelId : ariaLabelledby}
            aria-multiselectable={selectionMode === "multiple" || undefined}
            {...restListboxProps}
          >
            {children}
          </div>
        </div>
      </ListboxProvider>
    );
  },
);

InternalListbox.displayName = "InternalListbox";

export const Listbox = Object.assign(InternalListbox, {
  Option: ListboxOption,
});
