import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { ImgRatio, ImgOrientation } from '../Image/Image';

export type CardLayout = 'vertical' | 'horizontal';
export type CardVariant = 'plate' | 'post';
export type CardStyle = 'outlined' | 'empty';

export interface CardRootOwnProps {
  layout?: CardLayout;
  variant?: CardVariant;
  cardStyle?: CardStyle;
  isDisabled?: boolean;
  interactive?: boolean;
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

interface BasePresetOwnProps {
  layout?: CardLayout;
  isDisabled?: boolean;
  image?: {
    src: string;
    alt: string;
  };
}

export interface PlateWithTitlePresetBaseProps extends BasePresetOwnProps {
  caption?: string;
  title: string;
  body: ReactNode;
}

export type PlateWithTitlePresetProps =
  | (PlateWithTitlePresetBaseProps & {
      as: 'a';
      href: string;
      target?: string;
      rel?: string;
    })
  | (PlateWithTitlePresetBaseProps & {
      as: 'button';
      onClick: () => void;
      type?: 'button' | 'submit' | 'reset';
    });

export interface PlateWithLabelPresetBaseProps extends BasePresetOwnProps {
  caption?: string;
  label: string;
  body: ReactNode;
}

export type PlateWithLabelPresetProps =
  | (PlateWithLabelPresetBaseProps & {
      as: 'a';
      href: string;
      target?: string;
      rel?: string;
    })
  | (PlateWithLabelPresetBaseProps & {
      as: 'button';
      onClick: () => void;
      type?: 'button' | 'submit' | 'reset';
    });

export interface PlateCompactPresetBaseProps extends BasePresetOwnProps {
  caption: string;
  body: ReactNode;
}

export type PlateCompactPresetProps =
  | (PlateCompactPresetBaseProps & {
      as: 'a';
      href: string;
      target?: string;
      rel?: string;
    })
  | (PlateCompactPresetBaseProps & {
      as: 'button';
      onClick: () => void;
      type?: 'button' | 'submit' | 'reset';
    });

export interface PostPresetBaseProps extends BasePresetOwnProps {
  cardStyle?: 'outlined' | 'empty';
  title: string;
  body: ReactNode;
  author: string;
  date: string;
}

export type PostPresetProps =
  | (PostPresetBaseProps & {
      as: 'a';
      href: string;
      target?: string;
      rel?: string;
    })
  | (PostPresetBaseProps & {
      as: 'button';
      onClick: () => void;
      type?: 'button' | 'submit' | 'reset';
    });
