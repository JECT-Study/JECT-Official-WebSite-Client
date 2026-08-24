import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FieldProps } from "../Field";

export type SuggestionFieldProps = FieldProps;

type SuggestionFieldInputBaseProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "type" | "value" | "defaultValue" | "onChange" | "required"
> & {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  /** 제안 목록. 이미 추가한 값은 목록에서 제거된다. */
  suggestions?: string[];
  placeholder?: string;
  /** 추가할 수 있는 값의 최대 개수. 지정하면 `SuggestionField.Counter`가 현재 개수와 함께 표시된다. */
  maxValues?: number;
  /** 포커스가 제거될 때 입력 중인 값을 확정할지 여부 */
  acceptValueOnBlur?: boolean;
  /** 입력 오른쪽에 형제로 배치되는 부가 요소 */
  suffix?: ReactNode;
};

type SuggestionFieldInputControlledProps = {
  value: string[];
  defaultValue?: never;
  onChange: (value: string[]) => void;
};

type SuggestionFieldInputUncontrolledProps = {
  value?: never;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type SuggestionFieldInputProps = SuggestionFieldInputBaseProps &
  (SuggestionFieldInputControlledProps | SuggestionFieldInputUncontrolledProps);
