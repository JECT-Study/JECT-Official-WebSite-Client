import { createContext, useContext } from "react";

import type { CardLayout, CardVariant, CardStyle } from "./Card.types";

export interface CardContextValue {
  layout: CardLayout;
  variant: CardVariant;
  cardStyle?: CardStyle;
  isDisabled: boolean;
  interactive: boolean;
}

export const CardContext = createContext<CardContextValue | null>(null);

export const useCardContext = (): CardContextValue => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("must be used within Card.Root");
  }

  return context;
};
