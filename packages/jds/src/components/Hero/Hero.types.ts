export type HeroSize = 'lg' | 'md' | 'sm' | 'xs';
export type HeroTextAlign = 'left' | 'center' | 'right';

export interface HeroProps {
  size: HeroSize;
  textAlign: HeroTextAlign;
  children: React.ReactNode;
}

export interface StyledHeroProps {
  size: HeroSize;
  textAlign: HeroTextAlign;
}
