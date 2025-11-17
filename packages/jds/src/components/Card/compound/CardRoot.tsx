import { ElementType, useMemo } from 'react';

import { CardContext } from '../Card.context';
import type { CardRootOwnProps } from '../Card.types';
import { StyledCardRoot } from './compound.styles';

import { PolymorphicForwardRef } from '@/utils/forwardRef';

export const CardRoot = PolymorphicForwardRef<'div', CardRootOwnProps>(
  (
    {
      as,
      layout = 'vertical',
      variant = 'plate',
      cardStyle,
      isDisabled = false,
      children,
      ...restProps
    },
    ref,
  ) => {
    const Component = as || ('div' as ElementType);

    const contextValue = useMemo(
      () => ({ layout, variant, cardStyle, isDisabled }),
      [layout, variant, cardStyle, isDisabled],
    );

    return (
      <CardContext.Provider value={contextValue}>
        <StyledCardRoot
          ref={ref}
          as={Component}
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
