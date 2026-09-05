import type { StepsLayout, StepsSize } from "./steps.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

interface StepsContextValue {
  size: StepsSize;
  layout: StepsLayout;
  currentStep?: number;
}

export const [StepsProvider, useStepsContext] = createCtxProvider<StepsContextValue>(
  "Steps",
  "Steps.Root",
);
