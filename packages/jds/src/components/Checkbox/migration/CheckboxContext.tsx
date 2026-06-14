import { createContext, useContext } from "react";
import type { CheckboxGroupState } from "react-stately";

import type { CheckState, CheckboxSize, CheckboxStyle } from "./checkbox.types";

export interface CheckboxContextValue {
  size: CheckboxSize;
  style: CheckboxStyle;
  disabled: boolean;
  isInvalid: boolean;
  state?: CheckboxGroupState;
  onChildCheckedChange?: (checked: CheckState) => void;
}

const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export const CheckboxProvider = CheckboxContext.Provider;

export const useCheckboxContext = () => useContext(CheckboxContext);
