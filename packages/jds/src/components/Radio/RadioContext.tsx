import { createContext, useContext } from "react";
import type { RadioGroupState } from "react-stately";

import type { RadioAlign, RadioSize, RadioStyle } from "./radio.types";

export interface RadioContextValue {
  size: RadioSize;
  style: RadioStyle;
  align: RadioAlign;
  disabled: boolean;
  state?: RadioGroupState;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export const RadioProvider = RadioContext.Provider;

export const useRadioContext = () => useContext(RadioContext);
