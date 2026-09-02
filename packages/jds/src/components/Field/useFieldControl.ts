import { useLayoutEffect, type AriaAttributes } from "react";

import { useFieldContext } from "./Field.context";

export interface UseFieldControlOptions {
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: AriaAttributes["aria-invalid"];
}

export interface FieldControl {
  fieldId: string;
  isDisabled: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  ariaDescribedBy: string | undefined;
  ariaInvalid: AriaAttributes["aria-invalid"];
}

/**
 * @description 필드 컨텍스트와 컨트롤에 직접 전달된 값을 합쳐 컨트롤이 사용할 상태와 접근성 값을 해석한다.
 * 해석한 `required`는 Field에 전달해 `Field.Label`의 required mark에도 반영한다.
 *
 * 해석한 값만 반환하고 DOM 속성으로 적용하는 것은 컨트롤이 담당한다.
 * 동일한 상태라도 input은 native `readonly`를, combobox는 `aria-readonly`를 사용하는 등
 * 컨트롤에 따라 표현 방식이 다르기 때문이다.
 */
export const useFieldControl = (
  consumerName: string,
  {
    disabled,
    readOnly,
    required,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaInvalid,
  }: UseFieldControlOptions,
): FieldControl => {
  const {
    fieldId,
    labelId,
    hasLabel,
    helperId,
    hasHelper,
    counterId,
    hasCounter,
    onControlRequiredChange,
    status,
    disabled: isDisabledFromCtx,
    readonly: isReadOnlyFromCtx,
    required: isRequiredFromCtx,
  } = useFieldContext(consumerName);

  const isDisabled = disabled ?? isDisabledFromCtx;
  const isReadOnly = readOnly ?? isReadOnlyFromCtx;
  const isRequired = required ?? isRequiredFromCtx;

  useLayoutEffect(() => {
    onControlRequiredChange(isRequired);
    return () => onControlRequiredChange(false);
  }, [isRequired, onControlRequiredChange]);

  const resolvedLabelledBy = hasLabel ? labelId : ariaLabelledBy;
  const describedByIds = [
    hasHelper ? helperId : undefined,
    hasCounter ? counterId : undefined,
    ariaDescribedBy,
  ].filter(Boolean);

  return {
    fieldId,
    isDisabled,
    isReadOnly,
    isRequired,
    ariaLabel: resolvedLabelledBy == null ? ariaLabel : undefined,
    ariaLabelledBy: resolvedLabelledBy,
    ariaDescribedBy: describedByIds.length > 0 ? describedByIds.join(" ") : undefined,
    ariaInvalid: status === "error" ? true : ariaInvalid,
  };
};
