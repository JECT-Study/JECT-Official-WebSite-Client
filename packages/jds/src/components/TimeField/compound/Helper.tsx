import { forwardRef } from "react";

import { Field, type FieldHelperProps } from "../../Field";
import { useTimeFieldContext } from "../timeField.context";

/**
 * @description Field.Helper를 감싼다.
 * 입력 오류가 보이는 동안에는 루트가 TimeField의 문구를 그리므로 아무것도 그리지 않는다.
 */
export const TimeFieldHelper = forwardRef<HTMLSpanElement, FieldHelperProps>((props, ref) => {
  const { inputErrorMessage } = useTimeFieldContext("TimeField.Helper");
  if (inputErrorMessage !== null) return null;

  return <Field.Helper ref={ref} {...props} />;
});

TimeFieldHelper.displayName = "TimeField.Helper";
