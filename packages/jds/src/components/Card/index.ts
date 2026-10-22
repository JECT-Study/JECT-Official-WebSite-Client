import {
  CardRoot,
  CardThumbnail,
  CardContent,
  CardContentGroup,
  CardCaption,
  CardTitle,
  CardBody,
  CardMeta,
  CardMetaItem,
  CardOverlay,
} from "./compound";
import { Plate, Post } from "./presets";

export const Card = {
  Root: CardRoot,
  Thumbnail: CardThumbnail,
  Content: CardContent,
  ContentGroup: CardContentGroup,
  Caption: CardCaption,
  Title: CardTitle,
  Body: CardBody,
  Meta: CardMeta,
  MetaItem: CardMetaItem,
  Overlay: CardOverlay,

  Preset: {
    Plate,
    Post,
  },
};

export type { CardLayout, CardVariant } from "./card.types";

export type {
  CardRootProps,
  CardThumbnailImage,
  CardThumbnailProps,
  CardContentProps,
  CardContentGroupProps,
  CardCaptionProps,
  CardTitleProps,
  CardBodyProps,
  CardMetaProps,
  CardMetaItemProps,
  CardOverlayProps,
} from "./card.types";

export type {
  PlateLinkProps,
  PlateButtonProps,
  PostLinkProps,
  PostButtonProps,
} from "./card.types";

export {
  CardRoot,
  CardThumbnail,
  CardContent,
  CardContentGroup,
  CardCaption,
  CardTitle,
  CardBody,
  CardMeta,
  CardMetaItem,
  CardOverlay,
} from "./compound";
export { PlateLink as CardPlateLink, PlateButton as CardPlateButton } from "./presets/Plate";
export { PostLink as CardPostLink, PostButton as CardPostButton } from "./presets/Post";
export type {
  PlateLinkProps as CardPlateLinkProps,
  PlateButtonProps as CardPlateButtonProps,
  PostLinkProps as CardPostLinkProps,
  PostButtonProps as CardPostButtonProps,
} from "./card.types";
