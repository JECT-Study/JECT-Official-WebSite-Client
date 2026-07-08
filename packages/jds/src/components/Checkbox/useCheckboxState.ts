import { useCallback, useRef, useState } from "react";

type SetStateFn = (prevState: string[]) => string[];

export function useCheckboxState(
  valueProp: string[] | undefined,
  defaultValueProp: string[],
  onChange?: (value: string[]) => void,
): [string[], (next: string[] | SetStateFn) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValueProp);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolled;

  const isControlledRef = useRef(isControlled);
  isControlledRef.current = isControlled;

  const valueRef = useRef(value);
  valueRef.current = value;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback((next: string[] | SetStateFn) => {
    const nextValue = typeof next === "function" ? next(valueRef.current) : next;

    if (!isControlledRef.current) setUncontrolled(nextValue);
    onChangeRef.current?.(nextValue);
  }, []);

  return [value, setValue];
}
