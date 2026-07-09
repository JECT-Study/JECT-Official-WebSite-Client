import type { FieldStatus, FieldStyle } from "./field.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface FieldContextValue {
  fieldId: string;
  status: FieldStatus;
  fieldStyle: FieldStyle;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
}

export const [FieldProvider, useFieldContext] = createCtxProvider<FieldContextValue>("Field");
