import { forwardRef } from 'react';
import { HeroDiv, HeroSize, HeroTextAlign } from './Hero.style';
import { useTheme } from 'theme';

interface HeroProps {
  size?: HeroSize;
  textAlign?: HeroTextAlign;
  color?: string;
  children: React.ReactNode;
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(
  ({ size = 'lg', textAlign = 'center', color, children, ...props }, ref) => {
    const theme = useTheme();
    const BaseColor = color || theme.color.object.boldest;

    return (
      <HeroDiv ref={ref} size={size} textAlign={textAlign} color={BaseColor} {...props}>
        {children}
      </HeroDiv>
    );
  },
);

Hero.displayName = 'Hero';
