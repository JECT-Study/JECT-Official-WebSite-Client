import { forwardRef, useLayoutEffect } from "react";

import { Field, type FieldHelperProps } from "../../Field";
import { useTimeFieldContext } from "../timeField.context";

/**
 * @description Field.Helper를 감싸 입력 오류가 보일 때 TimeField의 문구를 대신 보여 준다.
 * 그 밖에는 children을 그대로 보여 준다.
 */
export const TimeFieldHelper = forwardRef<HTMLSpanElement, FieldHelperProps>(
  ({ children, ...props }, ref) => {
    const { inputErrorMessage, onHelperMountChange } = useTimeFieldContext("TimeField.Helper");

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

TimeFieldHelper.displayName = "TimeField.Helper";
