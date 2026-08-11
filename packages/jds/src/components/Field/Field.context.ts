import type { FieldStatus, FieldStyle } from "./field.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface FieldContextValue {
  fieldId: string;
  labelId: string;
  helperTextId: string;
  /** Field.HelperText가 실제로 렌더되고 있는지 여부예요. */
  hasHelperText: boolean;
  /** Field.HelperText가 mount/unmount될 때 호출돼요. */
  onHelperTextMountChange: (mounted: boolean) => void;
  status: FieldStatus;
  fieldStyle: FieldStyle;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
}

export const [FieldProvider, useFieldContext] = createCtxProvider<FieldContextValue>("Field");
