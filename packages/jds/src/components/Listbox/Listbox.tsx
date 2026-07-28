import { clsx } from "clsx";
import { type CSSProperties, forwardRef, useMemo } from "react";

import * as styles from "./listbox.css";
import type { ListboxProps, SelectDimension } from "./listbox.types";
import type { ListboxContextValue } from "./ListboxContext";
import { ListboxProvider } from "./ListboxContext";
import { Option } from "./Option";
import { useListbox } from "./useListbox";

import { getLabelClassName } from "@/utils/typography";

const resolveDimension = (value: SelectDimension) => (value === "full" ? "100%" : value);

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  (
    {
      mode,
      variant,
      disabled,
      label,
      width,
      height,
      value,
      defaultValue,
      onChange,
      options,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
    },
    ref,
  ) => {
    const { listboxRef, listboxId, isSelected, select, activeValue, setActive, getListboxProps } =
      useListbox({
        mode,
        options,
        value,
        defaultValue,
        onChange: onChange as ((value: string | string[]) => void) | undefined,
        disabled,
      });

    const labelId = `${listboxId}-label`;

    const containerStyle: CSSProperties = {};
    if (width !== undefined) {
      containerStyle.width = resolveDimension(width);
    }
    if (height !== undefined) {
      containerStyle.height = resolveDimension(height);
    }

    const contextValue = useMemo<ListboxContextValue>(
      () => ({ listboxId, disabled, variant, mode, isSelected, activeValue, select, setActive }),
      [listboxId, disabled, variant, mode, isSelected, activeValue, select, setActive],
    );

    return (
      <ListboxProvider value={contextValue}>
        <div className={styles.selectContainer} style={containerStyle} ref={ref}>
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
            className={styles.listbox}
            aria-label={label != null ? undefined : ariaLabel}
            aria-labelledby={label != null ? labelId : ariaLabelledby}
            {...getListboxProps()}
          >
            {options.map(
              ({
                value: optionValue,
                label: optionLabel,
                caption,
                suffix,
                disabled: optionDisabled,
              }) => (
                <Option
                  key={optionValue}
                  value={optionValue}
                  caption={caption}
                  suffix={suffix}
                  disabled={optionDisabled}
                >
                  {optionLabel}
                </Option>
              ),
            )}
          </div>
        </div>
      </ListboxProvider>
    );
  },
);

Listbox.displayName = "Listbox";
