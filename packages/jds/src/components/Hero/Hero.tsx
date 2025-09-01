import { forwardRef } from 'react';
import { HeroSize, HeroTextAlign, StyledHero } from './Hero.style';

interface HeroProps {
  size: HeroSize;
  textAlign: HeroTextAlign;
  children: React.ReactNode;
}

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
