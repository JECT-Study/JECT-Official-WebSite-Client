import { forwardRef, useMemo } from 'react';

import { CardContext } from '../Card.context';
import type { CardRootOwnProps } from '../Card.types';
import { StyledCardRoot } from './compound.styles';

export const CardRoot = forwardRef<HTMLElement, CardRootOwnProps>(
  (
    {
      layout = 'vertical',
      variant = 'plate',
      cardStyle,
      isDisabled = false,
      children,
      ...restProps
    },
    ref,
  ) => {
    const contextValue = useMemo(
      () => ({ layout, variant, cardStyle, isDisabled }),
      [layout, variant, cardStyle, isDisabled],
    );

    return (
      <CardContext.Provider value={contextValue}>
        <StyledCardRoot
          ref={ref}
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
