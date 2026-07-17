import { ListboxRoot } from "./ListboxRoot";
import { Option } from "./Option";
import type { MultiSelectProps } from "./select.types";

const MultiSelectBase = ({
  value,
  defaultValue,
  onChange,
  variant = "control",
  label,
  disabled = false,
  width,
  height,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: MultiSelectProps) => (
  <ListboxRoot
    mode='multiple'
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
    {children}
  </ListboxRoot>
);

MultiSelectBase.displayName = "MultiSelect";

export const MultiSelect = Object.assign(MultiSelectBase, { Option });
