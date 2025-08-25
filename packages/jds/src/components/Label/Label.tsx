import { forwardRef } from 'react';
import { StyledLabel } from './Label.style';
import { LabelProps } from './Label.types';
import { useTheme } from 'theme';

export const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ size, textAlign, weight, color, children, ...props }, ref) => {
    const theme = useTheme();
    const finalColor = color || theme.color.object.bold;

    return (
      <StyledLabel
        ref={ref}
        size={size}
        textAlign={textAlign}
        weight={weight}
        color={finalColor}
        {...props}
      >
        {children}
      </StyledLabel>
    );
  },
);

Label.displayName = 'Label';
