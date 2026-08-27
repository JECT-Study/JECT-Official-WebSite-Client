import { useLayoutEffect, useState, type ChangeEvent, type ChangeEventHandler } from "react";

import { useFieldContext } from "./Field.context";
import type { FieldCounterState } from "./field.types";

/**
 * @description 카운터에 표시할 값을 Field에 전달해 `Field.Counter`에서 사용할 수 있도록 한다.
 * `null`을 전달하면 값을 전달하지 않으며, 이 경우 `Field.Counter`를 배치해도 렌더되지 않는다.
 */
export const useFieldCounter = (consumerName: string, counter: FieldCounterState | null) => {
  const { onCounterChange } = useFieldContext(consumerName);

  const current = counter?.current;
  const max = counter?.max;

  useLayoutEffect(() => {
    if (current == null || max == null) return;

    onCounterChange({ current, max });
    return () => onCounterChange(null);
  }, [current, max, onCounterChange]);
};

type TextValue = string | number | readonly string[];

export interface UseTextLengthCounterOptions<T extends HTMLInputElement | HTMLTextAreaElement> {
  value?: TextValue;
  defaultValue?: TextValue;
  maxLength?: number;
  onChange?: ChangeEventHandler<T>;
}

/**
 * @description 텍스트 컨트롤의 글자 수를 추적해 `maxLength`와 함께 Field에 전달하고,
 * 글자 수를 추적하는 `onChange`를 반환한다.
 * controlled(`value`)와 uncontrolled(`defaultValue`)를 모두 지원하며,
 * uncontrolled에서는 `onChange`를 통해서만 글자 수를 추적한다.
 */
export const useTextLengthCounter = <T extends HTMLInputElement | HTMLTextAreaElement>(
  consumerName: string,
  { value, defaultValue, maxLength, onChange }: UseTextLengthCounterOptions<T>,
): ChangeEventHandler<T> => {
  const isControlled = value != null;
  const [uncontrolledLength, setUncontrolledLength] = useState(() =>
    defaultValue != null ? String(defaultValue).length : 0,
  );
  const length = isControlled ? String(value).length : uncontrolledLength;

  useFieldCounter(consumerName, maxLength == null ? null : { current: length, max: maxLength });

  return (event: ChangeEvent<T>) => {
    if (!isControlled) setUncontrolledLength(event.target.value.length);
    onChange?.(event);
  };
};
