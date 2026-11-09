import { forwardRef, useLayoutEffect } from "react";

import { Field, type FieldHelperProps } from "../../Field";
import { useTimeFieldContext } from "../timeField.context";

export const TimeFieldHelper = forwardRef<HTMLSpanElement, FieldHelperProps>(
  ({ children, ...props }, ref) => {
    const { inputReport, onHelperMountChange } = useTimeFieldContext("TimeField.Helper");

    useLayoutEffect(() => {
      onHelperMountChange(true);
      return () => onHelperMountChange(false);
    }, [onHelperMountChange]);

    return (
      <Field.Helper ref={ref} {...props}>
        {inputReport?.state.isErrorVisible ? inputReport.errorMessage : children}
      </Field.Helper>
    );
  },
);

TimeFieldHelper.displayName = "TimeField.Helper";
