import type { ComponentPropsWithoutRef } from 'react';

export interface BannerProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  subtitle?: string;
  label?: string;
  onClose?: () => void;
  closeAriaLabel?: string;
}
