import { clsx } from "clsx";
import { forwardRef, useCallback, useEffect, useId, useState } from "react";

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
    const [counterRegistrations, setCounterRegistrations] = useState<string[]>([]);
    const [counter, setCounter] = useState<FieldCounterState | null>(null);
    const [isControlRequired, setControlRequired] = useState(false);

    const registerCounter = useCallback((registrationId: string) => {
      setCounterRegistrations(prev => [...prev, registrationId]);
      return () => setCounterRegistrations(prev => prev.filter(id => id !== registrationId));
    }, []);

    const hasCounterConflict = counterRegistrations.length > 1;

    useEffect(() => {
      if (process.env.NODE_ENV === "production" || !hasCounterConflict) return;

      console.warn(
        "Counter 자리에 여러 요소가 배치되었습니다. 한 필드에는 하나만 배치하세요. (예: TextField.Counter와 TextField.Timer) 먼저 등록된 요소만 렌더됩니다.",
      );
    }, [hasCounterConflict]);

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
          hasCounter: counterRegistrations.length > 0,
          counterOwnerId: counterRegistrations[0] ?? null,
          onCounterRegister: registerCounter,
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
