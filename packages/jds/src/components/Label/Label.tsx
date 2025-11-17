import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { useTheme } from 'theme';

import type { LabelSize, LabelTextAlign, LabelWeight } from './Label.style';
import { LabelDiv } from './Label.style';

export interface LabelProps extends ComponentPropsWithoutRef<'div'> {
  size?: LabelSize;
  textAlign?: LabelTextAlign;
  weight?: LabelWeight;
  color?: string;
  children: ReactNode;
}

export const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ size = 'md', textAlign = 'left', weight = 'normal', color, children, ...props }, ref) => {
    const theme = useTheme();
    const BaseColor = color || theme.color.semantic.object.bold;
    return (
      <LabelDiv
        ref={ref}
        size={size}
        textAlign={textAlign}
        weight={weight}
        color={BaseColor}
        {...props}
      >
        {children}
      </LabelDiv>
    );
  },
);

Label.displayName = 'Label';
