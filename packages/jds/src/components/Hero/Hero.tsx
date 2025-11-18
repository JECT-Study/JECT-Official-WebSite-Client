import { forwardRef } from 'react';
import { useTheme } from 'theme';

import type { HeroSize, HeroTextAlign } from './Hero.style';
import { HeroDiv } from './Hero.style';

interface HeroProps {
  size?: HeroSize;
  textAlign?: HeroTextAlign;
  color?: string;
  children: React.ReactNode;
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(
  ({ size = 'lg', textAlign = 'center', color, children, ...props }, ref) => {
    const theme = useTheme();
    const BaseColor = color || theme.color.semantic.object.boldest;

    return (
      <HeroDiv ref={ref} size={size} textAlign={textAlign} color={BaseColor} {...props}>
        {children}
      </HeroDiv>
    );
  },
);

Hero.displayName = 'Hero';
