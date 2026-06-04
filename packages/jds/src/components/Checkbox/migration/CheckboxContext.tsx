import { createContext, useContext } from "react";
import type { CheckboxGroupState } from "react-stately";

import type { CheckboxSize, CheckboxStyle } from "./checkbox.types";

export interface CheckboxContextValue {
  size: CheckboxSize;
  style: CheckboxStyle;
  disabled: boolean;
  isInvalid: boolean;
  state?: CheckboxGroupState;
}

const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export const CheckboxProvider = CheckboxContext.Provider;

export const useCheckboxContext = () => useContext(CheckboxContext);
