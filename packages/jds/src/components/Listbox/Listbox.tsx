import { clsx } from "clsx";
import { type CSSProperties, forwardRef } from "react";

import * as styles from "./listbox.css";
import type { ListboxProps, SelectDimension } from "./listbox.types";
import { ListboxProvider } from "./ListboxContext";
import { Option } from "./Option";

import { getLabelClassName } from "@/utils/typography";

const resolveDimension = (value: SelectDimension) => (value === "full" ? "100%" : value);

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  (
    {
      context,
      options,
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

    const labelId = `${context.listboxId}-label`;

    const containerStyle: CSSProperties = { ...style };
    if (width !== undefined) {
      containerStyle.width = resolveDimension(width);
    }
    if (height !== undefined) {
      containerStyle.height = resolveDimension(height);
    }

    return (
      <ListboxProvider value={context}>
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
            {...restListboxProps}
          >
            {options.map(({ value, label: optionLabel, caption, suffix, disabled }) => (
              <Option
                key={value}
                value={value}
                caption={caption}
                suffix={suffix}
                disabled={disabled}
              >
                {optionLabel}
              </Option>
            ))}
          </div>
        </div>
      </ListboxProvider>
    );
  },
);

Listbox.displayName = "Listbox";
