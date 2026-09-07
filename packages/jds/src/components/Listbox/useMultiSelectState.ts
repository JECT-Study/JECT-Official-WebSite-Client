import { useControllableState } from "hooks";
import { useCallback } from "react";

export const useMultiSelectState = (
  value: string[] | undefined,
  defaultValue: string[] | undefined,
  onChange?: (value: string[]) => void,
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

  const remove = useCallback(
    (target: string) => {
      setSelectedValues(prev => prev.filter(v => v !== target));
    },
    [setSelectedValues],
  );

  return { selectedValues, toggle, remove };
};
