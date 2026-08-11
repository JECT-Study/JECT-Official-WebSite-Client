import { forwardRef } from "react";

import type { SelectProps } from "./select.types";
import { Listbox, useListbox, useSingleSelectState } from "../Listbox";

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
    const { selectedValues, select } = useSingleSelectState(value, defaultValue, onChange);

    const { listboxRef, contextValue, getFocusableListboxProps } = useListbox({
      selectedValues,
      disabled,
      onSelect: select,
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
        {options.map(option => (
          <Listbox.Option
            key={option.value}
            value={option.value}
            caption={option.caption}
            suffix={option.suffix}
            disabled={option.disabled}
          >
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox>
    );
  },
);

Select.displayName = "Select";
