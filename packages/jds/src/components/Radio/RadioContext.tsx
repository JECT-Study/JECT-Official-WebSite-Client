import { createContext, useContext } from "react";

import type { RadioSize } from "./radio.types";

interface RadioContextValue {
  radioSize: RadioSize;
  isDisabled: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export const RadioProvider = RadioContext.Provider;

export const useRadioContext = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("Radio 컴포넌트는 Radio.Root 내부에서 사용해야 합니다");
  }
  return context;
};
