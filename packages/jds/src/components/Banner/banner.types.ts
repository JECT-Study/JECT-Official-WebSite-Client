import type { ComponentPropsWithoutRef } from 'react';

import type { ImageProps } from '../Image/Image';

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

export interface BannerImageProps
  extends Omit<ImageProps, 'ratio' | 'orientation' | 'badgeVisible' | 'badgeLabel'> {
  variant?: 'image';
  title: string;
  subtitle?: string;
}

export type BannerProps = BannerBarProps | BannerImageProps;
