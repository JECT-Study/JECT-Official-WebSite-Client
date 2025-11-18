import { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { ImgRatio, ImgOrientation } from '../Image/Image';

export type CardLayout = 'vertical' | 'horizontal';
export type CardVariant = 'plate' | 'post';
export type CardStyle = 'outlined' | 'empty';

export interface CardRootOwnProps {
  layout?: CardLayout;
  variant?: CardVariant;
  cardStyle?: CardStyle;
  isDisabled?: boolean;
  children: ReactNode;
}

export interface CardImageProps extends ComponentPropsWithoutRef<'div'> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  ratio?: ImgRatio;
  orientation?: ImgOrientation;
  badgeVisible?: boolean;
  badgeLabel?: string;
  loading?: 'lazy' | 'eager';
}

export interface CardContentProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export interface CardCaptionProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode;
}

export interface CardTitleProps extends ComponentPropsWithoutRef<'h3'> {
  children: ReactNode;
}

export interface CardLabelProps extends ComponentPropsWithoutRef<'h4'> {
  children: ReactNode;
}

export interface CardBodyProps extends ComponentPropsWithoutRef<'p'> {
  children: ReactNode;
}

export interface CardMetaProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export interface CardMetaItemProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode;
}

export interface CardMetaNudgeItemProps extends ComponentPropsWithoutRef<'span'> {
  label?: string;
  children: ReactNode;
}

interface BasePresetProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  layout?: CardLayout;
  isDisabled?: boolean;
  image?: {
    src: string;
    alt: string;
  };
}

export interface PlateWithTitlePresetProps extends BasePresetProps {
  caption?: string;
  title: string;
  body: ReactNode;
}

export interface PlateWithLabelPresetProps extends BasePresetProps {
  caption?: string;
  label: string;
  body: ReactNode;
}

export interface PlateCompactPresetProps extends BasePresetProps {
  caption: string;
  body: ReactNode;
}

export interface PostPresetProps extends BasePresetProps {
  cardStyle?: 'outlined' | 'empty';
  title: string;
  body: ReactNode;
  author: string;
  date: string;
}
