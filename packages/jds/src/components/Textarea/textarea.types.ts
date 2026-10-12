import type { ComponentPropsWithoutRef } from "react";

import type { FieldProps, FieldStatus } from "../Field";

export interface TextareaProps extends Omit<FieldProps, "status"> {
  status?: Exclude<FieldStatus, "success">;
}

export interface TextareaControlProps extends Omit<
  ComponentPropsWithoutRef<"textarea">,
  "id" | "required"
> {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
}
