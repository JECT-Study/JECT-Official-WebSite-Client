import { forwardRef } from 'react';
import { HeroDiv, HeroSize, HeroTextAlign } from './Hero.style';
import { useTheme } from 'theme';

interface HeroProps {
  size: HeroSize;
  textAlign: HeroTextAlign;
  children: React.ReactNode;
  color?: string;
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(
  ({ size, textAlign, children, color, ...props }, ref) => {
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
