import { clsx } from "clsx";
import { forwardRef, useRef, useState, type ChangeEvent } from "react";

import { IconButton } from "../../Button/IconButton";
import { FieldContent, FieldKbd } from "../../Field";
import * as fieldStyles from "../../Field/field.css";
import { useFieldControl } from "../../Field/useFieldControl";
import { useTextLengthCounter } from "../../Field/useFieldCounter";
import * as styles from "../textField.css";
import type { TextFieldInputProps } from "../textField.types";

import { mergeRefs } from "@/hooks/mergeRefs";
import { getBodyClassName } from "@/utils/typography";

export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  (
    {
      prefix,
      kbd,
      withClearButton = false,
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
    } = useFieldControl("TextField.Input", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCountedChange = useTextLengthCounter<HTMLInputElement>("TextField.Input", {
      value,
      defaultValue,
      maxLength,
      onChange,
    });

    const isControlled = value != null;
    const [hasUncontrolledValue, setHasUncontrolledValue] = useState(
      defaultValue != null && String(defaultValue) !== "",
    );

    const hasValue = isControlled ? String(value) !== "" : hasUncontrolledValue;
    const isInteractive = !isDisabled && !isReadOnly;
    const hasClearButton = withClearButton && hasValue && isInteractive;

    const handleChange = isControlled
      ? handleCountedChange
      : (e: ChangeEvent<HTMLInputElement>) => {
          setHasUncontrolledValue(e.target.value !== "");
          handleCountedChange?.(e);
        };

    const handleClear = () => {
      const input = inputRef.current;
      if (input == null) return;

      // controlled와 uncontrolled 모두 onChange로 빈 값을 전달하도록, native setter로 값을 바꾼 뒤 input 이벤트를 발생시킨다.
      // React는 자체 setter를 거치지 않은 값 변경을 감지해 onChange를 호출한다.
      Reflect.set(HTMLInputElement.prototype, "value", "", input);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    };

    return (
      <FieldContent>
        {prefix != null && (
          <span className={clsx(fieldStyles.contentSlot, styles.affix)}>{prefix}</span>
        )}
        <input
          {...restProps}
          ref={mergeRefs(ref, inputRef)}
          id={fieldId}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-required={isRequired || undefined}
          data-field-control=''
          // native :read-only는 readonly를 지원하지 않는 input type에서도 매칭되므로, 해석된 상태를 data 속성으로 내려준다.
          data-readonly={isReadOnly || undefined}
          className={clsx(getBodyClassName({ size: "md" }), styles.input, className)}
        />
        {(hasClearButton || kbd != null) && (
          <span className={fieldStyles.contentTrailing}>
            {hasClearButton && (
              <IconButton
                hierarchy='tertiary'
                size='md'
                icon='x'
                aria-label='입력 내용 지우기'
                className={fieldStyles.contentAction}
                onClick={handleClear}
              />
            )}
            {kbd != null && <FieldKbd keys={kbd} disabled={isDisabled} />}
          </span>
        )}
      </FieldContent>
    );
  },
);

TextFieldInput.displayName = "TextField.Input";
