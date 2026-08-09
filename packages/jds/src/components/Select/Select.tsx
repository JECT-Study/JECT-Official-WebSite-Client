import { useControllableState } from "hooks";
import { forwardRef, useCallback, useMemo } from "react";

import type { SelectProps } from "./select.types";
import { Listbox, useListbox } from "../Listbox";

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      variant = "label",
      label,
      disabled = false,
      width,
      height,
      options,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
    },
    ref,
  ) => {
    const handleChange = useCallback(
      (next: string | null) => {
        if (next != null) onChange?.(next);
      },
      [onChange],
    );

    const [selectedValue, setSelectedValue] = useControllableState<string | null>(
      value,
      defaultValue ?? null,
      handleChange,
    );

    const selectedValues = useMemo(
      () => (selectedValue == null ? [] : [selectedValue]),
      [selectedValue],
    );

    const { listboxRef, contextValue, getFocusableListboxProps } = useListbox({
      options,
      selectedValues,
      disabled,
      onSelect: setSelectedValue,
    });

    return (
      <Listbox
        ref={ref}
        context={contextValue}
        selectionMode='single'
        variant={variant}
        label={label}
        width={width}
        height={height}
        listboxRef={listboxRef}
        listboxProps={getFocusableListboxProps()}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        {options.map(({ value: optionValue, label: optionLabel, caption, suffix, disabled }) => (
          <Listbox.Option
            key={optionValue}
            value={optionValue}
            caption={caption}
            suffix={suffix}
            disabled={disabled}
          >
            {optionLabel}
          </Listbox.Option>
        ))}
      </Listbox>
    );
  },
);

Select.displayName = "Select";
