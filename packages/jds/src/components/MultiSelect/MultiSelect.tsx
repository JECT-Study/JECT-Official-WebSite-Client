import { useControllableState } from "hooks";
import { forwardRef, useCallback } from "react";

import type { MultiSelectProps } from "./multiSelect.types";
import { Listbox, useListbox } from "../Listbox";

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
    const [selectedValues, setSelectedValues] = useControllableState<string[]>(
      value,
      defaultValue ?? [],
      onChange,
    );

    const toggle = useCallback(
      (next: string) => {
        setSelectedValues(prev =>
          prev.includes(next) ? prev.filter(v => v !== next) : [...prev, next],
        );
      },
      [setSelectedValues],
    );

    const { listboxRef, contextValue, getFocusableListboxProps } = useListbox({
      options,
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
