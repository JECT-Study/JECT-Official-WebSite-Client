import type { CheckedState, CheckboxSize, CheckboxVariant } from "./checkbox.types";

import { createOptionalCtxProvider } from "@/hooks/createCtxProvider";

export interface CheckboxGroupState {
  value: string[];
  isSelected: (value: string) => boolean;
  toggle: (value: string) => void;
}

export interface CheckboxConfigContextValue {
  size: CheckboxSize;
  variant: CheckboxVariant;
  disabled: boolean;
  isInvalid: boolean;
  stretched: boolean;
  name?: string;
}

export const [CheckboxConfigProvider, useCheckboxConfig] =
  createOptionalCtxProvider<CheckboxConfigContextValue>("CheckboxConfig");

export const [CheckboxSelectionProvider, useCheckboxSelection] =
  createOptionalCtxProvider<CheckboxGroupState>("CheckboxSelection");

export interface CheckboxItemContextValue {
  labelId: string;
  helperId: string;
  hasHelper: boolean;
  onHelperMountChange: (mounted: boolean) => void;
  onChildCheckedChange: (checked: CheckedState) => void;
}

export const [CheckboxItemProvider, useCheckboxItem] =
  createOptionalCtxProvider<CheckboxItemContextValue>("CheckboxItem");
