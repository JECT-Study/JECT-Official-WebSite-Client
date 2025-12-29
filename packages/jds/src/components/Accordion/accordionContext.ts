import { createContext, useContext } from "react";

import type { AccordionSize } from "./accordion.types";

export interface AccordionContextValue {
  isStretched: boolean;
  size: AccordionSize;
}

export const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion 컴포넌트는 Accordion.Root 내부에서 사용해야 합니다");
  }
  return context;
};
