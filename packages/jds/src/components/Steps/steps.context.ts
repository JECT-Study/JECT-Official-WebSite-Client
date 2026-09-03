import { createContext, useContext } from "react";

import type { StepsLayout, StepsSize } from "./steps.types";

interface StepsContextValue {
  size: StepsSize;
  layout: StepsLayout;
  currentStep?: number;
}

export const StepsContext = createContext<StepsContextValue | null>(null);

export const useStepsContext = (componentName: string) => {
  const context = useContext(StepsContext);

  if (!context) {
    throw new Error(`${componentName}는 Steps.Root 내부에서만 사용되어야 합니다.`);
  }

  return context;
};
