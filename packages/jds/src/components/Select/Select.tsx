import type { SelectProps } from "./select.types";
import { Listbox } from "../Listbox";

export const Select = ({
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
}: SelectProps) => (
  <Listbox
    mode='single'
    variant={variant}
    disabled={disabled}
    label={label}
    width={width}
    height={height}
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    options={options}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
  />
);

Select.displayName = "Select";
