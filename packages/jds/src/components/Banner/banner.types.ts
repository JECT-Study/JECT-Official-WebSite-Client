import type { ComponentPropsWithoutRef } from 'react';

export type BannerVariant = 'bar' | 'image';

interface BaseBannerProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  subtitle?: string;
}

export interface BannerBarProps extends BaseBannerProps {
  variant?: 'bar';
  label?: string;
  onClose?: () => void;
  closeAriaLabel?: string;
}

export interface BannerImageProps extends BaseBannerProps {
  variant: 'image';
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}

export type BannerProps = BannerBarProps | BannerImageProps;
