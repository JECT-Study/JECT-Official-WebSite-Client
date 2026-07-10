import { useCallback, useRef, useState } from "react";

type SetStateFn<T> = (prevState: T) => T;

/**
 * 제어 모드와 비제어 모드를 모두 지원하는 상태 훅
 *
 * `valueProp`이 `undefined`가 아니면 제어 모드로 동작하며 내부 상태를 사용하지 않는다.
 * `valueProp`이 `undefined`이면 `defaultValueProp`을 초기값으로 하는 내부 상태를 사용한다.
 * 두 모드 모두 값이 변경되면 `onChange`를 호출한다.
 *
 * @param valueProp 제어 모드에서 사용하는 값 (`undefined`이면 비제어 모드로 동작)
 * @param defaultValueProp 비제어 모드에서 사용하는 초기값
 * @param onChange 값이 변경될 때 호출하는 콜백
 * @returns 현재 값과 setter
 */
export const useControllableState = <T>(
  valueProp: T | undefined,
  defaultValueProp: T,
  onChange?: (value: T) => void,
): [T, (next: T | SetStateFn<T>) => void] => {
  const [uncontrolled, setUncontrolled] = useState(defaultValueProp);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolled;

  const isControlledRef = useRef(isControlled);
  isControlledRef.current = isControlled;

  const valueRef = useRef(value);
  valueRef.current = value;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback((next: T | SetStateFn<T>) => {
    const nextValue = typeof next === "function" ? (next as SetStateFn<T>)(valueRef.current) : next;

    if (!isControlledRef.current) {
      setUncontrolled(nextValue);
    }

    onChangeRef.current?.(nextValue);
  }, []);

  return [value, setValue];
};
