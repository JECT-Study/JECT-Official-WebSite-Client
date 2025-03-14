import { Density, Variant } from '@/types/ui/interaction';

export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type Hierarchy = 'accent' | 'primary' | 'secondary' | 'tertiary';

interface LabelButtonStyleType {
  size: Record<Size, string>;
  hierarchy: Record<Hierarchy, string>;
  disabled?: Record<Hierarchy, string>;
}

export const labelButtonStyle: LabelButtonStyleType = {
  size: {
    xs: 'label-xs',
    sm: 'label-sm',
    md: 'label-md',
    lg: 'label-lg',
  },
  hierarchy: {
    accent: 'text-accent-hero-dark',
    primary: 'text-object-hero-dark',
    secondary: 'text-object-neutral-dark',
    tertiary: 'text-object-alternative-dark',
  },
  disabled: {
    accent: 'text-accent-trans-hero-dark',
    primary: 'text-object-disabled-dark',
    secondary: 'text-object-disabled-dark',
    tertiary: 'text-object-disabled-dark',
  },
};

export const labelButtonInteractionMap: Record<
  Hierarchy,
  { variant: Variant; density: Density; isInversed: boolean }
> = {
  accent: { variant: 'brand', density: 'subtle', isInversed: false },
  primary: { variant: 'default', density: 'subtle', isInversed: false },
  secondary: { variant: 'default', density: 'subtle', isInversed: false },
  tertiary: { variant: 'brand', density: 'subtle', isInversed: false },
};
