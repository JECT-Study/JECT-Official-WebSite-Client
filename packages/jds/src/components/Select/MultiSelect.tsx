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
  >
    {children}
  </ListboxRoot>
);

MultiSelectBase.displayName = "MultiSelect";

export const MultiSelect = Object.assign(MultiSelectBase, { Option });
