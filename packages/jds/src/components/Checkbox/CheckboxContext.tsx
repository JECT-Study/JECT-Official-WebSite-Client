import { createContext, useContext } from "react";
import type { CheckboxGroupState } from "react-stately";

import type { CheckedState, CheckboxSize, CheckboxVariant } from "./checkbox.types";

export interface CheckboxConfigContextValue {
  size: CheckboxSize;
  variant: CheckboxVariant;
  disabled: boolean;
  isInvalid: boolean;
  state?: CheckboxGroupState;
}

const CheckboxConfigContext = createContext<CheckboxConfigContextValue | null>(null);

export const CheckboxConfigProvider = CheckboxConfigContext.Provider;

export const useCheckboxConfig = () => useContext(CheckboxConfigContext);

export interface CheckboxItemContextValue {
  labelId: string;
  helperId: string;
  hasHelper: boolean;
  onHelperMountChange: (mounted: boolean) => void;
  onChildCheckedChange: (checked: CheckedState) => void;
}

const CheckboxItemContext = createContext<CheckboxItemContextValue | null>(null);

export const CheckboxItemProvider = CheckboxItemContext.Provider;

export const useCheckboxItem = () => useContext(CheckboxItemContext);
