import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { ThumbnailOrientation, ThumbnailRatio } from "../Thumbnail";

export type CardLayout = "vertical" | "horizontal";
export type CardVariant = "plate" | "post";

export interface CardRootOwnProps extends ComponentPropsWithoutRef<"div"> {
  layout?: CardLayout;
  variant?: CardVariant;
  isDisabled?: boolean;
  interactive?: boolean;
  children?: ReactNode;
}

export interface CardImageProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  src?: string;
  alt: string;
  fallback?: ReactNode;
  ratio?: ThumbnailRatio;
  orientation?: ThumbnailOrientation;
  badgeVisible?: boolean;
  badgeLabel?: string;
  loading?: "lazy" | "eager";
}

export interface CardContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface CardCaptionProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode;
  standalone?: boolean;
}

export interface CardTitleProps extends ComponentPropsWithoutRef<"h3"> {
  children: ReactNode;
}

/**
 * @deprecated Plate Card는 Card.Label 위계 요소를 지원하지 않습니다. Post 마이그레이션 완료 후 제거 예정입니다.
 */
export interface CardLabelProps extends ComponentPropsWithoutRef<"h4"> {
  children: ReactNode;
}

export interface CardBodyProps extends ComponentPropsWithoutRef<"p"> {
  children: ReactNode;
}

export interface CardMetaProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface CardMetaItemProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode;
}

interface BasePresetOwnProps {
  layout?: CardLayout;
  isDisabled?: boolean;
  image?: {
    src?: string;
    alt: string;
  };
}

export interface PlatePresetBaseProps extends BasePresetOwnProps {
  caption?: string;
  title: string;
  body: ReactNode;
}

export type PlatePresetProps =
  | (PlatePresetBaseProps & {
      as: "a";
      href: string;
      target?: string;
      rel?: string;
    })
  | (PlatePresetBaseProps & {
      as: "button";
      onClick: () => void;
      type?: "button" | "submit" | "reset";
    });

export interface PostPresetBaseProps extends BasePresetOwnProps {
  title: string;
  body: ReactNode;
  author: string;
  date: string;
}

export type PostPresetProps =
  | (PostPresetBaseProps & {
      as: "a";
      href: string;
      target?: string;
      rel?: string;
    })
  | (PostPresetBaseProps & {
      as: "button";
      onClick: () => void;
      type?: "button" | "submit" | "reset";
    });
