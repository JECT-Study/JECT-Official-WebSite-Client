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
}

export interface TextFieldTimerProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  /** 남은 시간 (초). 카운트다운 진행은 소비처가 담당한다. */
  seconds: number;
  /** 시간 표기에 사용할 포매터. 기본값은 `m:ss` 형식의 `formatTimer` */
  timeFormatter?: (seconds: number) => string;
}
