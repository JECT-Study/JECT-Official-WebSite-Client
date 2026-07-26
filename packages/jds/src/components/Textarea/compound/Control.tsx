import { clsx } from "clsx";
import {
  forwardRef,
  useLayoutEffect,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from "react";

import { useFieldContext } from "../../Field/Field.context";
import { useTextareaContext } from "../Textarea.context";
import * as styles from "../textarea.css";

import { getBodyClassName } from "@/utils/typography";

export type TextareaControlProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "id" | "disabled" | "readOnly" | "required"
>;

/**
 * @description Field 컨텍스트(fieldId·status·disabled·readonly·required)를 소비해 Textarea.Content 안에 놓이는 실제 textarea.
 * controlled(value·onChange) / uncontrolled(defaultValue) 를 모두 지원하며, 값 길이를 Textarea 컨텍스트에 보고해
 * Textarea.Counter 가 별도 prop 없이 글자 수를 표시할 수 있게 한다.
 */
export const TextareaControl = forwardRef<HTMLTextAreaElement, TextareaControlProps>(
  ({ className, value, defaultValue, onChange, maxLength, ...restProps }, ref) => {
    const {
      fieldId,
      helperTextId,
      hasHelperText,
      status,
      disabled: isDisabled,
      readonly: isReadonly,
      required: isRequired,
    } = useFieldContext("Textarea.Control");
    const { onControlStateChange } = useTextareaContext("Textarea.Control");

    const isControlled = value != null;
    const [uncontrolledLength, setUncontrolledLength] = useState(() =>
      defaultValue != null ? String(defaultValue).length : 0,
    );
    const valueLength = isControlled ? String(value).length : uncontrolledLength;

    useLayoutEffect(() => {
      onControlStateChange({ valueLength, maxLength });
    }, [onControlStateChange, valueLength, maxLength]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setUncontrolledLength(event.target.value.length);
      onChange?.(event);
    };

    return (
      <textarea
        ref={ref}
        id={fieldId}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        disabled={isDisabled}
        readOnly={isReadonly}
        required={isRequired}
        maxLength={maxLength}
        aria-describedby={hasHelperText ? helperTextId : undefined}
        aria-invalid={status === "error"}
        className={clsx(
          getBodyClassName({ size: "md" }),
          styles.control({ disabled: isDisabled, readOnly: isReadonly }),
          className,
        )}
        {...restProps}
      />
    );
  },
);

TextareaControl.displayName = "Textarea.Control";
