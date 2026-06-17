import { createContext, useContext } from "react";

import type { AccordionSize } from "./accordion.types";

export interface AccordionContextValue {
  isStretched: boolean;
  size: AccordionSize;
}

export const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

export const useAccordionContext = (componentName: string) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(`${componentName}는 Accordion.Root 내부에서 사용해야 합니다`);
  }
  return context;
};
