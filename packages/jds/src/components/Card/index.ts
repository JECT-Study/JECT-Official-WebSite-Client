import {
  CardRoot,
  CardImage,
  CardContent,
  CardCaption,
  CardTitle,
  CardLabel,
  CardBody,
  CardMeta,
  CardMetaItem,
  CardOverlay,
} from "./compound";
import { Plate, Post } from "./presets";

export const Card = {
  Root: CardRoot,
  Image: CardImage,
  Content: CardContent,
  Caption: CardCaption,
  Title: CardTitle,
  Label: CardLabel,
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
  CardRootOwnProps,
  CardImageProps,
  CardContentProps,
  CardCaptionProps,
  CardTitleProps,
  CardLabelProps,
  CardBodyProps,
  CardMetaProps,
  CardMetaItemProps,
} from "./Card.types";

export type { PlatePresetProps, PostPresetProps } from "./Card.types";
