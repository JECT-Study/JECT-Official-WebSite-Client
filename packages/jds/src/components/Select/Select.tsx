import { ListboxRoot } from "./ListboxRoot";
import { Option } from "./Option";
import type { SelectProps } from "./select.types";

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
  <ListboxRoot
    mode='single'
    variant={variant}
    disabled={disabled}
    label={label}
    width={width}
    height={height}
    value={value}
    defaultValue={defaultValue}
    onChange={onChange as ((value: string | string[]) => void) | undefined}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
  >
    {options.map(
      ({ value: optionValue, label: optionLabel, caption, suffix, disabled: optionDisabled }) => (
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
  </ListboxRoot>
);

Select.displayName = "Select";
