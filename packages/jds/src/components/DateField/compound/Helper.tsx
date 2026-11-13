import { forwardRef, useLayoutEffect } from "react";

import { Field, type FieldHelperProps } from "../../Field";
import { useDateFieldContext } from "../dateField.context";

/**
 * @description Field.Helper를 감싸 입력 오류가 보일 때 DateField의 문구를 대신 보여 준다.
 * 그 밖에는 children을 그대로 보여 준다.
 */
export const DateFieldHelper = forwardRef<HTMLSpanElement, FieldHelperProps>(
  ({ children, ...props }, ref) => {
    const { inputErrorMessage, onHelperMountChange } = useDateFieldContext("DateField.Helper");

    useLayoutEffect(() => {
      onHelperMountChange(true);
      return () => onHelperMountChange(false);
    }, [onHelperMountChange]);

    return (
      <Field.Helper ref={ref} {...props}>
        {inputErrorMessage ?? children}
      </Field.Helper>
    );
  },
);

DateFieldHelper.displayName = "DateField.Helper";
