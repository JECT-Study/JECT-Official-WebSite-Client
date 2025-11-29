import { forwardRef, useMemo } from "react";

import { CardContext } from "../Card.context";
import type { CardRootOwnProps } from "../Card.types";
import { StyledCardRoot } from "./compound.styles";

export const CardRoot = forwardRef<HTMLDivElement, CardRootOwnProps>(
  (
    {
      layout = "vertical",
      variant = "plate",
      cardStyle,
      isDisabled = false,
      interactive = false,
      children,
      ...restProps
    },
    ref,
  ) => {
    const contextValue = useMemo(
      () => ({ layout, variant, cardStyle, isDisabled, interactive }),
      [layout, variant, cardStyle, isDisabled, interactive],
    );

    return (
      <CardContext.Provider value={contextValue}>
        <StyledCardRoot
          ref={ref}
          data-interactive={interactive ? "true" : "false"}
          $layout={layout}
          $variant={variant}
          $cardStyle={cardStyle}
          $isDisabled={isDisabled}
          {...restProps}
        >
          {children}
        </StyledCardRoot>
      </CardContext.Provider>
    );
  },
);
