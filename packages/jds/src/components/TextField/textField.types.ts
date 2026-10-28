import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FieldProps } from "../Field";

export type TextFieldProps = FieldProps;

// prefix는 HTMLAttributes의 RDFa 속성과 타입이 충돌하므로 제외하고 ReactNode로 재정의한다.
export interface TextFieldInputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "prefix" | "required"
> {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  /** 입력 왼쪽에 배치되는 부가 요소 */
  prefix?: ReactNode;
  /** 입력 오른쪽에 배치되는 부가 요소 */
  suffix?: ReactNode;
  /** 입력한 텍스트를 모두 지우는 버튼 표시 여부. 값이 없거나 readonly, disabled 상태에서는 표시하지 않는다. */
  withClearButton?: boolean;
}
