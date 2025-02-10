export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type Hierarchy = 'accent' | 'primary' | 'secondary' | 'tertiary';

interface LabelButtonStyleType {
  size: Record<Size, string>;
  hierarchy: Record<Hierarchy, string>;
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
};
