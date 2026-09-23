import { forwardRef, useEffect, useMemo } from "react";

import type { OptionListProps } from "./optionList.types";
import { Listbox, useListbox } from "../../../Listbox";

export const OptionList = forwardRef<HTMLDivElement, OptionListProps>(
  (
    {
      options,
      value,
      height,
      onSelect,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      ...restProps
    },
    forwardedRef,
  ) => {
    const selectedValues = useMemo(() => [value], [value]);
    const { listboxRef, behavior, getFocusableListboxProps } = useListbox({
      selectedValues,
      disabled: false,
      onSelect,
    });

    useEffect(() => {
      listboxRef.current?.focus({ preventScroll: true });
    }, [listboxRef]);

    return (
      <Listbox
        ref={forwardedRef}
        {...restProps}
        data-part='root'
        behavior={behavior}
        selectionMode='single'
        variant='label'
        surface={false}
        width='full'
        height={height}
        listboxRef={listboxRef}
        listboxProps={getFocusableListboxProps()}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        {options.map(option => (
          <Listbox.Option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox>
    );
  },
);

OptionList.displayName = "DatePicker.OptionList";
