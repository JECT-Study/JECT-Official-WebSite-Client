import { forwardRef } from 'react';
import { HeroDiv, HeroSize, HeroTextAlign } from './Hero.style';

interface HeroProps {
  size: HeroSize;
  textAlign: HeroTextAlign;
  children: React.ReactNode;
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(
  ({ size, textAlign, children, ...props }, ref) => {
    return (
      <HeroDiv ref={ref} size={size} textAlign={textAlign} {...props}>
        {children}
      </HeroDiv>
    );
  },
);

Hero.displayName = 'Hero';
