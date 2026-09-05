import type { AccordionSize } from "./accordion.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface AccordionContextValue {
  isStretched: boolean;
  size: AccordionSize;
}

export const [AccordionProvider, useAccordionContext] = createCtxProvider<AccordionContextValue>(
  "Accordion",
  "Accordion.Root",
);
