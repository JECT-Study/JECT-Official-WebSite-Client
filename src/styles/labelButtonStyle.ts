export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonHierarchy = 'accent' | 'primary' | 'secondary' | 'tertiary';

interface LabelButtonStyleType {
  size: Record<ButtonSize, string>;
  hierarchy: Record<ButtonHierarchy, string>;
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
