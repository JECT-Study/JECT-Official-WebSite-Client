import { forwardRef } from "react";

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
    const { listboxRef, contextValue, getListboxProps } = useListbox({
      mode: "single",
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
        options={options}
        label={label}
        width={width}
        height={height}
        listboxRef={listboxRef}
        listboxProps={getListboxProps()}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      />
    );
  },
);

Select.displayName = "Select";
