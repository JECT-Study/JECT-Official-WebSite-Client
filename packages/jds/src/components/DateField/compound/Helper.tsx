import { forwardRef, useLayoutEffect } from "react";

import { Field, type FieldHelperProps } from "../../Field";
import { getDateFieldErrorMessage, useDateFieldContext } from "../dateField.context";

export const DateFieldHelper = forwardRef<HTMLSpanElement, FieldHelperProps>(
  ({ children, ...props }, ref) => {
    const { inputState, onHelperMountChange } = useDateFieldContext("DateField.Helper");

    useLayoutEffect(() => {
      onHelperMountChange(true);
      return () => onHelperMountChange(false);
    }, [onHelperMountChange]);

    return (
      <Field.Helper ref={ref} {...props}>
        {inputState?.isErrorVisible ? getDateFieldErrorMessage(inputState.error) : children}
      </Field.Helper>
    );
  },
);

DateFieldHelper.displayName = "DateField.Helper";
