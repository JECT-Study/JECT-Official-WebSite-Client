import { clsx } from "clsx";
import { forwardRef, useId, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { FieldCounter } from "./compound/Counter";
import { FieldFooter } from "./compound/Footer";
import { FieldHelper } from "./compound/Helper";
import { FieldLabel } from "./compound/Label";
import { FieldProvider } from "./Field.context";
import * as styles from "./field.css";
import type { FieldCounterState, FieldStatus } from "./field.types";

export interface FieldProps extends ComponentPropsWithoutRef<"div"> {
  status?: FieldStatus;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
}

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
        fieldId={fieldId}
        labelId={labelId}
        hasLabel={hasLabel}
        onLabelMountChange={setHasLabel}
        helperId={helperId}
        hasHelper={hasHelper}
        onHelperMountChange={setHasHelper}
        counterId={counterId}
        counter={counter}
        onCounterChange={setCounter}
        hasCounter={hasCounter}
        onCounterMountChange={setHasCounter}
        isControlRequired={isControlRequired}
        onControlRequiredChange={setControlRequired}
        status={status}
        readonly={readonly}
        disabled={disabled}
        required={required}
      >
        <div ref={ref} className={clsx(styles.container(), className)} {...restProps}>
          {children}
        </div>
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
