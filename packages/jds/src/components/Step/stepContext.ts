import { createContext, useContext } from "react";

import type { StepLayout, StepSize } from "./step.types";

type StepContextValue = {
  size: StepSize;
  layout: StepLayout;
  currentStep?: number;
};

export const StepContext = createContext<StepContextValue | null>(null);

export const useStepContext = (componentName: string) => {
  const context = useContext(StepContext);

  if (!context) {
    throw new Error(`${componentName}는 Step.Root 내부에서만 사용되어야 합니다.`);
  }

  return context;
};
