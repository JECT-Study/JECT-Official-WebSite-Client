import { forwardRef } from "react";

import { Field, type FieldHelperProps } from "../../Field";
import { useDateFieldContext } from "../dateField.context";

/**
 * @description Field.Helper를 감싼다.
 * 입력 오류가 보이는 동안에는 루트가 DateField의 문구를 그리므로 아무것도 그리지 않는다.
 */
export const DateFieldHelper = forwardRef<HTMLSpanElement, FieldHelperProps>((props, ref) => {
  const { inputErrorMessage } = useDateFieldContext("DateField.Helper");
  if (inputErrorMessage !== null) return null;

  return <Field.Helper ref={ref} {...props} />;
});

DateFieldHelper.displayName = "DateField.Helper";
