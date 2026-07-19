import { Listbox } from "./Listbox";
import type { MultiSelectProps } from "./select.types";

export const MultiSelect = ({
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
}: MultiSelectProps) => (
  <Listbox
    mode='multiple'
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

MultiSelect.displayName = "MultiSelect";
