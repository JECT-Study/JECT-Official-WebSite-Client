import {
  CardRoot,
  CardContent,
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
  Content: CardContent,
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
  CardRootOwnProps,
  CardContentProps,
  CardCaptionProps,
  CardTitleProps,
  CardBodyProps,
  CardMetaProps,
  CardMetaItemProps,
} from "./Card.types";

export type { PlatePresetProps, PostPresetProps } from "./Card.types";
