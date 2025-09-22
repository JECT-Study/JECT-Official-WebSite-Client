import { forwardRef, ReactNode } from 'react';
import { TitleDiv, LabelSize, LabelTextAlign } from './Title.style';
import { useTheme } from 'theme';

interface TitleProps {
  size?: LabelSize;
  textAlign?: LabelTextAlign;
  color?: string;
  children: ReactNode;
}

export const Title = forwardRef<HTMLDivElement, TitleProps>(
  ({ size = 'md', textAlign = 'left', color, children, ...props }, ref) => {
    const theme = useTheme();
    const BaseColor = color || theme.color.object.bolder;

    return (
      <TitleDiv ref={ref} size={size} textAlign={textAlign} color={BaseColor} {...props}>
        {children}
      </TitleDiv>
    );
  },
);

Title.displayName = 'Title';
