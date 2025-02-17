import { Density, Variant } from '@/styles/interactionStyle.ts';

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

export const labelButtonInteractionMap: Record<Hierarchy, { variant: Variant; density: Density }> =
  {
    accent: { variant: 'brand', density: 'subtle' },
    primary: { variant: 'default', density: 'subtle' },
    secondary: { variant: 'default', density: 'subtle' },
    tertiary: { variant: 'brand', density: 'subtle' },
  };

export const labelButtonOutlineOffsetMap: Record<Size, number> = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};
