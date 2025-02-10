export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type Style = 'solid' | 'outlined';
export type Hierarchy = 'accent' | 'primary' | 'secondary' | 'tertiary';

interface BlockButtonStyleType {
  size: Record<Size, string>;
  variant: {
    solid: Record<Hierarchy, string>;
    outlined: Record<Hierarchy, string>;
  };
}

export const blockButtonStyle: BlockButtonStyleType = {
  size: {
    xs: 'py-(--gap-3xs) px-(--gap-xs) rounded-(--radius-xs) label-xs',
    sm: 'py-(--gap-2xs) px-(--gap-sm) rounded-(--radius-2xs) label-sm',
    md: 'py-(--gap-xs) px-(--gap-lg) rounded-(--radius-2xs) label-md',
    lg: 'py-(--gap-sm) px-(--gap-2xl) rounded-(--radius-3xs) label-xs',
  },
  variant: {
    solid: {
      accent: 'bg-accent-normal-dark text-object-inverse-hero-light',
      primary: 'bg-object-hero-dark text-object-inverse-hero-dark',
      secondary: 'bg-object-alternative-dark text-object-static-inverse-hero-dark',
      tertiary: 'bg-fill-assistive-dark text--object-neutral-dark',
    },
    outlined: {
      accent: 'border border-accent-hero-dark text-accent-hero-dark',
      primary: 'border border-hero-dark text-object-hero-dark',
      secondary: 'border border-neutral-dark text-object-neutral-dark',
      tertiary: 'border border-alternative-dark text-object-alternative-dark',
    },
  },
};
