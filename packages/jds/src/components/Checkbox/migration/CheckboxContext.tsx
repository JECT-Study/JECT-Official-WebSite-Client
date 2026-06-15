import { createContext, useContext } from "react";
import type { CheckboxGroupState } from "react-stately";

import type { CheckedState, CheckboxSize, CheckboxVariant } from "./checkbox.types";

export interface CheckboxContextValue {
  size: CheckboxSize;
  variant: CheckboxVariant;
  disabled: boolean;
  isInvalid: boolean;
  state?: CheckboxGroupState;
  onChildCheckedChange?: (checked: CheckedState) => void;
  withinItem?: boolean;
}

const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export const CheckboxProvider = CheckboxContext.Provider;

export const useCheckboxContext = () => useContext(CheckboxContext);
