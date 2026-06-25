import { createContext, useContext } from "react";

import type { CardLayout, CardVariant } from "./Card.types";

export interface CardContextValue {
  layout: CardLayout;
  variant: CardVariant;
  isDisabled: boolean;
  titleId: string;
}

export const CardContext = createContext<CardContextValue | undefined>(undefined);

export const useCardContext = (componentName: string) => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error(`${componentName}는 Card.Root 내부에서만 사용되어야 합니다.`);
  }

  return context;
};
