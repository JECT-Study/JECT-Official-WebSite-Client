import { useControllableState } from "hooks";
import { useMemo } from "react";

export const useSingleSelectState = (
  value: string | null | undefined,
  defaultValue: string | undefined,
  onChange?: (value: string) => void,
) => {
  const [selectedValue, select] = useControllableState<string | null>(
    value,
    defaultValue ?? null,
    next => {
      if (next != null) onChange?.(next);
    },
  );

  const selectedValues = useMemo(
    () => (selectedValue == null ? [] : [selectedValue]),
    [selectedValue],
  );

  return { selectedValue, selectedValues, select };
};
