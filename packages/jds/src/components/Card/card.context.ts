import type { CardLayout, CardVariant } from "./card.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface CardContextValue {
  layout: CardLayout;
  variant: CardVariant;
  isDisabled: boolean;
  titleId: string;
}

export const [CardProvider, useCardContext] = createCtxProvider<CardContextValue>(
  "Card",
  "Card.Root",
);

export const useCardRootGuard = (componentName: string) => {
  useCardContext(componentName);
};
