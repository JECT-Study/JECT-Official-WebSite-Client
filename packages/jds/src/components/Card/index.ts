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
  CardMetaNudgeItem,
} from './compound';
import { PlateWithTitle, PlateWithLabel, PlateCompact, Post } from './presets';

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
  MetaNudgeItem: CardMetaNudgeItem,

  Preset: {
    PlateWithTitle,
    PlateWithLabel,
    PlateCompact,
    Post,
  },
};

export type { CardLayout, CardVariant, CardStyle } from './Card.types';

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
  CardMetaNudgeItemProps,
} from './Card.types';

export type {
  PlateWithTitlePresetProps,
  PlateWithLabelPresetProps,
  PlateCompactPresetProps,
  PostPresetProps,
} from './Card.types';
