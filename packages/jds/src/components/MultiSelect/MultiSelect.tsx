import { forwardRef } from "react";

import type { MultiSelectProps } from "./multiSelect.types";
import { Listbox, useListbox, useMultiSelectState } from "../Listbox";

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      variant = "control",
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
    const { selectedValues, toggle } = useMultiSelectState(value, defaultValue, onChange);

    const { listboxRef, contextValue, getFocusableListboxProps } = useListbox({
      selectedValues,
      disabled,
      onSelect: toggle,
    });

    return (
      <Listbox
        ref={ref}
        context={contextValue}
        selectionMode='multiple'
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

MultiSelect.displayName = "MultiSelect";
