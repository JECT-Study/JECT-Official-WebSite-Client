import type { CSSProperties } from "react";

import * as styles from "./compound.css";
import { Thumbnail, type ThumbnailShapeProps } from "../../Thumbnail";
import { useCardContext } from "../Card.context";

interface CardThumbnailImageProps {
  src?: string;
  alt: string;
}

interface CardThumbnailProps {
  image: CardThumbnailImageProps;
  style?: CSSProperties;
}

const ratioByVariantLayout = {
  plate: { vertical: "3:4", horizontal: "1:1" },
  post: { vertical: "1:2", horizontal: "1:1" },
} as const;

export const CardThumbnail = ({ image, style }: CardThumbnailProps) => {
  const { layout, variant } = useCardContext();

  const ratio = ratioByVariantLayout[variant][layout];
  const shape: ThumbnailShapeProps =
    ratio === "1:1" ? { ratio: "1:1" } : { ratio, orientation: "landscape" };

  return (
    <div className={styles.imageContainer({ layout, variant })} style={style}>
      <Thumbnail
        src={image.src}
        alt={image.alt}
        appearance={variant === "plate" ? "hollow" : "outlined"}
        cornerStyle='angular'
        {...shape}
      />
    </div>
  );
};

CardThumbnail.displayName = "CardThumbnail";
