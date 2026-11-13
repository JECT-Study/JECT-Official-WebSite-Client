import { useId, useLayoutEffect, useRef, type ChangeEvent, type ChangeEventHandler } from "react";

import { useFieldContext } from "./field.context";

/**
 * @description Counter 자리에 렌더할 요소를 Field에 등록하고, 자리를 쓸 수 있는지 여부를 반환한다.
 * Counter 자리에는 하나만 렌더되므로 `isSlotAvailable`이 false이면 렌더하지 않는다.
 * 등록은 layout effect에서 이뤄지므로, 아직 아무도 자리를 차지하지 않은 서버 렌더와 첫 렌더에서는 렌더를 허용한다.
 *
 * @param enabled - 표시할 값이 있을 때만 등록한다.
 */
export const useFieldCounterSlot = (consumerName: string, enabled = true) => {
  const { counterId, counterOwnerId, onCounterRegister } = useFieldContext(consumerName);
  const registrationId = useId();

  useLayoutEffect(() => {
    if (!enabled) return;

    return onCounterRegister(registrationId);
  }, [enabled, registrationId, onCounterRegister]);

  const isSlotAvailable = enabled && (counterOwnerId === null || counterOwnerId === registrationId);

  return { counterId, isSlotAvailable };
};

export interface UseItemCounterOptions {
  count: number;
  max?: number;
}

/**
 * @description 컨트롤이 이미 알고 있는 항목 개수를 최대 개수와 함께 Field에 전달한다.
 * `max`가 없으면 값을 전달하지 않는다.
 */
export const useItemCounter = (consumerName: string, { count, max }: UseItemCounterOptions) => {
  const { onCounterChange } = useFieldContext(consumerName);

  useLayoutEffect(() => {
    if (max == null) return;

    onCounterChange({ current: count, max });
    return () => onCounterChange(null);
  }, [count, max, onCounterChange]);
};

type TextValue = string | number | readonly string[];

export interface UseTextLengthCounterOptions<T extends HTMLInputElement | HTMLTextAreaElement> {
  value?: TextValue;
  defaultValue?: TextValue;
  maxLength?: number;
  onChange?: ChangeEventHandler<T>;
}

/**
 * @description 텍스트 컨트롤의 글자 수를 추적해 `maxLength`와 함께 Field에 전달한다.
 * uncontrolled(`defaultValue`)에서는 글자 수를 추적하는 `onChange`를 반환하고,
 * controlled(`value`)에서는 전달받은 `onChange`를 그대로 반환한다.
 * uncontrolled에서는 `onChange`를 통해서만 글자 수를 추적한다.
 */
export const useTextLengthCounter = <T extends HTMLInputElement | HTMLTextAreaElement>(
  consumerName: string,
  { value, defaultValue, maxLength, onChange }: UseTextLengthCounterOptions<T>,
): ChangeEventHandler<T> | undefined => {
  const { onCounterChange } = useFieldContext(consumerName);

  const isControlled = value != null;
  const uncontrolledLengthRef = useRef<number>(
    defaultValue != null ? String(defaultValue).length : 0,
  );

  useLayoutEffect(() => {
    if (maxLength == null) return;

    const current = isControlled ? String(value).length : uncontrolledLengthRef.current;
    onCounterChange({ current, max: maxLength });
    return () => onCounterChange(null);
  }, [isControlled, maxLength, onCounterChange, value]);

  if (isControlled) return onChange;

  return (event: ChangeEvent<T>) => {
    uncontrolledLengthRef.current = event.target.value.length;
    if (maxLength != null) {
      onCounterChange({ current: uncontrolledLengthRef.current, max: maxLength });
    }
    onChange?.(event);
  };
};
