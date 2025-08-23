import { forwardRef } from 'react';
import { HeroProps } from './Hero.types';
import { StyledHero } from './Hero.style';

export const Hero = forwardRef<HTMLDivElement, HeroProps>(
  ({ size, textAlign, children, ...props }, ref) => {
    return (
      <StyledHero ref={ref} size={size} textAlign={textAlign} {...props}>
        {children}
      </StyledHero>
    );
  },
);

Hero.displayName = 'Hero';
