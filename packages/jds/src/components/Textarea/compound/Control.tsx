import { clsx } from "clsx";
import {
  forwardRef,
  useLayoutEffect,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from "react";

import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import { useTextareaContext } from "../Textarea.context";
import * as styles from "../textarea.css";

import { getBodyClassName } from "@/utils/typography";

export interface TextareaControlProps extends Omit<
  ComponentPropsWithoutRef<"textarea">,
  "id" | "required"
> {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
}

/**
 * @description Field 컨텍스트를 소비해 필드 박스와 실제 textarea를 함께 렌더한다.
 * controlled(`value`, `onChange`)와 uncontrolled(`defaultValue`) 방식을 모두 지원한다.
 * uncontrolled 방식에서는 `onChange`를 통해서만 글자 수를 추적한다.
 */
export const TextareaControl = forwardRef<HTMLTextAreaElement, TextareaControlProps>(
  (
    {
      readOnly: readOnlyFromProps,
      disabled: disabledFromProps,
      required: requiredFromProps,
      "aria-label": ariaLabelFromProps,
      "aria-labelledby": labelledByFromProps,
      "aria-describedby": describedByFromProps,
      "aria-invalid": invalidFromProps,
      className,
      value,
      defaultValue,
      onChange,
      maxLength,
      ...restProps
    },
    ref,
  ) => {
    const {
      fieldId,
      isDisabled,
      isReadOnly,
      isRequired,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaInvalid,
    } = useFieldControl("Textarea.Control", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });

    const { onCounterChange } = useTextareaContext("Textarea.Control");

    const isControlled = value != null;
    const [uncontrolledLength, setUncontrolledLength] = useState(() =>
      defaultValue != null ? String(defaultValue).length : 0,
    );
    const valueLength = isControlled ? String(value).length : uncontrolledLength;

    useLayoutEffect(() => {
      if (maxLength == null) return;

      onCounterChange({ current: valueLength, max: maxLength });
      return () => onCounterChange(null);
    }, [valueLength, maxLength, onCounterChange]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setUncontrolledLength(event.target.value.length);
      onChange?.(event);
    };

    return (
      <FieldContent>
        <textarea
          {...restProps}
          ref={ref}
          id={fieldId}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          aria-required={isRequired || undefined}
          disabled={isDisabled}
          readOnly={isReadOnly}
          data-field-control=''
          data-readonly={isReadOnly || undefined}
          className={clsx(getBodyClassName({ size: "md" }), styles.control, className)}
        />
      </FieldContent>
    );
  },
);

TextareaControl.displayName = "Textarea.Control";
