import { useId, type ReactNode } from "react";

import { FieldContent } from "./compound/Content";
import { FieldHelperText } from "./compound/HelperText";
import { FieldLabel } from "./compound/Label";
import { FieldProvider } from "./Field.context";
import * as styles from "./field.css";
import type { FieldStatus, FieldStyle } from "./field.types";

export interface FieldProps {
  status?: FieldStatus;
  fieldStyle?: FieldStyle;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
}

const InternalField = ({
  status = "default",
  fieldStyle = "outline",
  readonly = false,
  disabled = false,
  required = false,
  children,
}: FieldProps) => {
  const fieldId = useId();

  return (
    <FieldProvider
      fieldId={fieldId}
      status={status}
      fieldStyle={fieldStyle}
      readonly={readonly}
      disabled={disabled}
      required={required}
    >
      <div className={styles.container()}>{children}</div>
    </FieldProvider>
  );
};

InternalField.displayName = "InternalField";

/**
 * @description Field component는 내부 internal component로 field류의 component를 구현하는 데 사용되는 컴포넌트입니다.
 */
export const Field = Object.assign(InternalField, {
  Label: FieldLabel,
  Content: FieldContent,
  HelperText: FieldHelperText,
});
