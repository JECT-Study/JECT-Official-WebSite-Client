import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type CardLayout = "vertical" | "horizontal";
export type CardVariant = "plate" | "post";

export interface CardRootProps extends ComponentPropsWithoutRef<"div"> {
  layout?: CardLayout;
  variant?: CardVariant;
  isDisabled?: boolean;
  interactive?: boolean;
  children?: ReactNode;
}

type CardSlotProps<E extends ElementType> = ComponentPropsWithoutRef<E> & { children: ReactNode };

export type CardContentProps = CardSlotProps<"div">;
export type CardContentGroupProps = CardSlotProps<"div">;
export type CardCaptionProps = CardSlotProps<"span">;
export type CardTitleProps = CardSlotProps<"h3">;
export type CardBodyProps = CardSlotProps<"p">;
export type CardMetaProps = CardSlotProps<"div">;
export type CardMetaItemProps = CardSlotProps<"span">;

interface CardOverlayLinkProps extends ComponentPropsWithoutRef<"a"> {
  as?: "a";
  href: string;
}

interface CardOverlayButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "disabled"> {
  as: "button";
}

export type CardOverlayProps = CardOverlayLinkProps | CardOverlayButtonProps;

export interface CardThumbnailImage {
  src?: string;
  alt: string;
}

export interface CardThumbnailProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  image: CardThumbnailImage;
}

interface BasePresetOwnProps extends Omit<ComponentPropsWithoutRef<"div">, "onClick" | "children"> {
  layout?: CardLayout;
  isDisabled?: boolean;
  image?: CardThumbnailImage;
}

interface PresetLinkOwnProps {
  href: string;
  target?: string;
  rel?: string;
}

interface PresetButtonOwnProps {
  onClick: NonNullable<ComponentPropsWithoutRef<"button">["onClick"]>;
  type?: "button" | "submit" | "reset";
}

export interface PlatePresetBaseProps extends BasePresetOwnProps {
  caption?: string;
  title: string;
  body: ReactNode;
}

export interface PlateLinkProps extends PlatePresetBaseProps, PresetLinkOwnProps {}
export interface PlateButtonProps extends PlatePresetBaseProps, PresetButtonOwnProps {}

export interface PostPresetBaseProps extends BasePresetOwnProps {
  title: string;
  body: ReactNode;
  author: string;
  date: string;
}

export interface PostLinkProps extends PostPresetBaseProps, PresetLinkOwnProps {}
export interface PostButtonProps extends PostPresetBaseProps, PresetButtonOwnProps {}
