import { clsx } from "clsx";
import {
  forwardRef,
  useLayoutEffect,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from "react";

import { Field, type FieldContentProps, type FieldProps } from "../Field";
import { TextareaProvider, useTextareaContext, type TextareaState } from "./Textarea.context";
import * as styles from "./textarea.css";
import { useFieldContext } from "../Field/Field.context";

import { getBodyClassName, getLabelClassName } from "@/utils/typography";

export type TextareaProps = FieldProps;

/**
 * 루트는 내부 Field primitive 를 래핑하고, 글자 수 카운터를 위한 값 길이·maxLength 를 추적한다.
 */
const TextareaRoot = ({ children, ...restProps }: TextareaProps) => {
  const [{ valueLength, maxLength }, setControlState] = useState<TextareaState>({
    valueLength: 0,
  });

  return (
    <TextareaProvider
      valueLength={valueLength}
      maxLength={maxLength}
      onControlStateChange={setControlState}
    >
      <Field {...restProps}>{children}</Field>
    </TextareaProvider>
  );
};

TextareaRoot.displayName = "Textarea";

/**
 * @description Field.Content(테두리/포커스 링을 담당하는 박스) 위에 textarea·counter 를 세로로 쌓는 래퍼.
 * counter 는 박스 내부 우측 하단에 위치한다.
 */
export const Content = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, ...restProps }, ref) => (
    <Field.Content ref={ref} {...restProps}>
      <div className={styles.body}>{children}</div>
    </Field.Content>
  ),
);

Content.displayName = "Textarea.Content";

export type TextareaControlProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "id" | "disabled" | "readOnly"
>;

/**
 * @description Field 컨텍스트(fieldId·disabled·readonly)를 소비해 Textarea.Content 안에 놓이는 실제 textarea.
 * controlled(value·onChange) / uncontrolled(defaultValue) 를 모두 지원하며, 값 길이를 Textarea 컨텍스트에 보고해
 * Textarea.Counter 가 별도 prop 없이 글자 수를 표시할 수 있게 한다.
 */
export const Control = forwardRef<HTMLTextAreaElement, TextareaControlProps>(
  ({ className, value, defaultValue, onChange, maxLength, ...restProps }, ref) => {
    const {
      fieldId,
      helperTextId,
      hasHelperText,
      disabled: isDisabled,
      readonly: isReadonly,
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
        maxLength={maxLength}
        aria-describedby={hasHelperText ? helperTextId : undefined}
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

Control.displayName = "Textarea.Control";

/**
 * @description maxLength 가 지정된 경우에만 `현재/최대` 형태로 글자 수를 박스 내부 우측 하단에 표시한다.
 * 길이는 Textarea 컨텍스트에서 읽으므로 별도 prop 이 필요 없다.
 */
export const Counter = () => {
  const { disabled: isDisabled } = useFieldContext("Textarea.Counter");
  const { valueLength, maxLength } = useTextareaContext("Textarea.Counter");

  if (maxLength == null) return null;

  return (
    <span className={clsx(getLabelClassName({ size: "sm" }), styles.counter({ disabled: isDisabled }))}>
      {`${valueLength}/${maxLength}`}
    </span>
  );
};

Counter.displayName = "Textarea.Counter";

/**
 * @description Field primitive 위에 얹은 공개 compound Textarea (여러 줄 텍스트 입력).
 *
 * @example
 * ```tsx
 * <Textarea status="error" required>
 *   <Textarea.Label>자기소개</Textarea.Label>
 *   <Textarea.Content>
 *     <Textarea.Control maxLength={200} placeholder="내용을 입력하세요" />
 *     <Textarea.Counter />
 *   </Textarea.Content>
 *   <Textarea.HelperText>200자 이내로 입력해주세요</Textarea.HelperText>
 * </Textarea>
 * ```
 */
export const Textarea = Object.assign(TextareaRoot, {
  Label: Field.Label,
  Content,
  Control,
  Counter,
  HelperText: Field.HelperText,
});
