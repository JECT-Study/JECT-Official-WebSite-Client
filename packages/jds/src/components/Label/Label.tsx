import { forwardRef, ReactNode } from 'react';
import { LabelDiv, LabelSize, LabelTextAlign, LabelWeight } from './Label.style';
import { useTheme } from 'theme';

interface LabelProps {
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
