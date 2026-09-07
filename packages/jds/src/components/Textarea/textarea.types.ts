import type { ComponentPropsWithoutRef } from "react";

import type { FieldProps } from "../Field";

export type TextareaProps = FieldProps;

export interface TextareaControlProps extends Omit<
  ComponentPropsWithoutRef<"textarea">,
  "id" | "required"
> {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
}
