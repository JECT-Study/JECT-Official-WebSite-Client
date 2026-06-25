import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type CardLayout = "vertical" | "horizontal";
export type CardVariant = "plate" | "post";

export interface CardRootOwnProps extends ComponentPropsWithoutRef<"div"> {
  layout?: CardLayout;
  variant?: CardVariant;
  isDisabled?: boolean;
  interactive?: boolean;
  children?: ReactNode;
}

export interface CardContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface CardCaptionProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode;
}

export interface CardTitleProps extends ComponentPropsWithoutRef<"h3"> {
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

interface CardOverlayLinkProps extends ComponentPropsWithoutRef<"a"> {
  as?: "a";
  href: string;
}

interface CardOverlayButtonProps extends ComponentPropsWithoutRef<"button"> {
  as: "button";
}

export type CardOverlayProps = CardOverlayLinkProps | CardOverlayButtonProps;

export interface CardThumbnailImage {
  src?: string;
  alt: string;
}

interface BasePresetOwnProps {
  layout?: CardLayout;
  isDisabled?: boolean;
  image?: CardThumbnailImage;
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
