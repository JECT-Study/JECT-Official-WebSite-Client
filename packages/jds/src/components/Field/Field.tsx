import { clsx } from "clsx";
import { forwardRef, useId, useState } from "react";

import { FieldCounter } from "./compound/Counter";
import { FieldFooter } from "./compound/Footer";
import { FieldHelper } from "./compound/Helper";
import { FieldLabel } from "./compound/Label";
import { FieldCounterValueProvider, FieldProvider } from "./field.context";
import * as styles from "./field.css";
import type { FieldCounterState, FieldProps } from "./field.types";

const InternalField = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      id: idFromProps,
      status = "default",
      readonly = false,
      disabled = false,
      required = false,
      children,
      className,
      ...restProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = idFromProps ?? generatedId;
    const labelId = `${fieldId}-label`;
    const helperId = `${fieldId}-helper`;
    const counterId = `${fieldId}-counter`;
    const [hasLabel, setHasLabel] = useState(false);
    const [hasHelper, setHasHelper] = useState(false);
    const [hasCounter, setHasCounter] = useState(false);
    const [counter, setCounter] = useState<FieldCounterState | null>(null);
    const [isControlRequired, setControlRequired] = useState(false);

    return (
      <FieldProvider
        value={{
          fieldId,
          labelId,
          hasLabel,
          onLabelMountChange: setHasLabel,
          helperId,
          hasHelper,
          onHelperMountChange: setHasHelper,
          counterId,
          onCounterChange: setCounter,
          hasCounter,
          onCounterMountChange: setHasCounter,
          isControlRequired,
          onControlRequiredChange: setControlRequired,
          status,
          readonly,
          disabled,
          required,
        }}
      >
        <FieldCounterValueProvider value={counter}>
          <div ref={ref} className={clsx(styles.container(), className)} {...restProps}>
            {children}
          </div>
        </FieldCounterValueProvider>
      </FieldProvider>
    );
  },
);

InternalField.displayName = "InternalField";

export const Field = Object.assign(InternalField, {
  Label: FieldLabel,
  Helper: FieldHelper,
  Counter: FieldCounter,
  Footer: FieldFooter,
});
