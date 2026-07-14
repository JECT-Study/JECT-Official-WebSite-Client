import { forwardRef } from "react";

import { Field, type FieldContentProps } from "../../Field";
import * as styles from "../textarea.css";

/**
 * @description Field.Content(테두리/포커스 링을 담당하는 박스) 위에 textarea·counter 를 세로로 쌓는 래퍼.
 * counter 는 박스 내부 우측 하단에 위치한다.
 */
export const TextareaContent = forwardRef<HTMLDivElement, FieldContentProps>(
  ({ children, ...restProps }, ref) => (
    <Field.Content ref={ref} {...restProps}>
      <div className={styles.body}>{children}</div>
    </Field.Content>
  ),
);

TextareaContent.displayName = "Textarea.Content";
