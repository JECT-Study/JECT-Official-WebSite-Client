import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type FieldStatus = "default" | "success" | "error";

/** 컨트롤이 보고하는 카운터 값. Field.Counter가 이 값을 렌더한다. */
export interface FieldCounterState {
  /** 현재 개수 (글자 수, 선택 개수 등) */
  current: number;
  /** 허용 최대 개수 */
  max: number;
}

export interface FieldProps extends ComponentPropsWithoutRef<"div"> {
  status?: FieldStatus;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
}

export interface FieldContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

// prefix는 HTMLAttributes의 RDFa 속성과 타입이 충돌하므로 제외하고 ReactNode로 재정의한다.
export interface FieldLabelProps extends Omit<
  ComponentPropsWithoutRef<"label">,
  "htmlFor" | "prefix"
> {
  children?: ReactNode;
  /** 레이블 텍스트 앞에 배치되는 부가 요소 (예: 아이콘) */
  prefix?: ReactNode;
  /** 레이블 텍스트 뒤에 배치되는 부가 요소 (예: 도움말 아이콘) */
  suffix?: ReactNode;
}

export interface FieldHelperProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
}

export type FieldCounterProps = Omit<ComponentPropsWithoutRef<"span">, "children">;

export type FieldFooterProps = ComponentPropsWithoutRef<"div">;
