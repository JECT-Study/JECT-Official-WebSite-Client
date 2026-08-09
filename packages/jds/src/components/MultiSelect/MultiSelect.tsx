import { forwardRef } from "react";

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
    const { listboxRef, contextValue, getFocusableListboxProps } = useListbox({
      mode: "multiple",
      variant,
      options,
      value,
      defaultValue,
      onChange: onChange as ((value: string | string[]) => void) | undefined,
      disabled,
    });

    return (
      <Listbox
        ref={ref}
        context={contextValue}
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

MultiSelect.displayName = "MultiSelect";
