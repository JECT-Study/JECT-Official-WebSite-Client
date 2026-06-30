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

export type { CardLayout, CardVariant } from "./Card.types";

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
} from "./Card.types";

export type { PlatePresetProps, PostPresetProps } from "./Card.types";
