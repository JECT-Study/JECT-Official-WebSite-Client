import { clsx } from "clsx";
import {
  forwardRef,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { FieldContent } from "./compound/Content";
import { FieldHelperText } from "./compound/HelperText";
import { FieldLabel } from "./compound/Label";
import { FieldProvider } from "./Field.context";
import * as styles from "./field.css";
import type { FieldStatus, FieldStyle } from "./field.types";

export interface FieldProps extends ComponentPropsWithoutRef<"div"> {
  status?: FieldStatus;
  fieldStyle?: FieldStyle;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
}

const InternalField = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      status = "default",
      fieldStyle = "outline",
      readonly = false,
      disabled = false,
      required = false,
      children,
      className,
      ...restProps
    },
    ref,
  ) => {
    const fieldId = useId();
    const helperTextId = `${fieldId}-helper-text`;
    const [hasHelperText, setHasHelperText] = useState(false);

    return (
      <FieldProvider
        fieldId={fieldId}
        helperTextId={helperTextId}
        hasHelperText={hasHelperText}
        onHelperTextMountChange={setHasHelperText}
        status={status}
        fieldStyle={fieldStyle}
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

/**
 * @description Field component는 내부 internal component로 field류의 component를 구현하는 데 사용되는 컴포넌트입니다.
 */
export const Field = Object.assign(InternalField, {
  Label: FieldLabel,
  Content: FieldContent,
  HelperText: FieldHelperText,
});
