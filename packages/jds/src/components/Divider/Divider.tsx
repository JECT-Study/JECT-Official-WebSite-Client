import { forwardRef, type Ref } from 'react';

import {
  StyledDivider,
  StyledDividerLine,
  StyledDividerTextWrapper,
  StyledDividerWithTextContainer,
  StyledVerticalDivider,
} from './divider.styles';
import type { DividerProps, DividerWithTextProps } from './divider.types';

const DividerBasic = forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  ({ thickness = 'normal', orientation = 'horizontal', decorative = false, ...restProps }, ref) => {
    if (orientation === 'vertical') {
      return (
        <StyledVerticalDivider
          ref={ref as Ref<HTMLDivElement>}
          role='separator'
          aria-orientation='vertical'
          aria-hidden={decorative}
          $thickness={thickness}
          {...restProps}
        />
      );
    }

    return (
      <StyledDivider
        ref={ref as Ref<HTMLHRElement>}
        aria-hidden={decorative}
        $orientation={orientation}
        $thickness={thickness}
        {...restProps}
      />
    );
  },
);

DividerBasic.displayName = 'Divider';

const DividerWithText = forwardRef<HTMLDivElement, DividerWithTextProps>(
  (
    { children, thickness = 'normal', textAlign = 'center', decorative = false, ...restProps },
    ref,
  ) => {
    const hasLeftLine = textAlign === 'center' || textAlign === 'right';
    const hasRightLine = textAlign === 'center' || textAlign === 'left';

    return (
      <StyledDividerWithTextContainer
        ref={ref}
        role='presentation'
        aria-hidden={decorative}
        $textAlign={textAlign}
        {...restProps}
      >
        {hasLeftLine && <StyledDividerLine $thickness={thickness} />}
        <StyledDividerTextWrapper>{children}</StyledDividerTextWrapper>
        {hasRightLine && <StyledDividerLine $thickness={thickness} />}
      </StyledDividerWithTextContainer>
    );
  },
);

DividerWithText.displayName = 'Divider.WithText';

export const Divider = Object.assign(DividerBasic, {
  WithText: DividerWithText,
});
