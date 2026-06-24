import type { CSSProperties } from "react";

import * as styles from "./compound.css";
import { Thumbnail, type ThumbnailShapeProps } from "../../Thumbnail";
import { useCardContext } from "../Card.context";

interface CardThumbnailProps {
  image: { src?: string; alt: string };
  style?: CSSProperties;
}

const orientationByLayout = {
  vertical: "landscape",
  horizontal: "portrait",
} as const;

const ratioByVariantLayout = {
  plate: { vertical: "3:4", horizontal: "1:1" },
  post: { vertical: "1:2", horizontal: "1:1" },
} as const;

export const CardThumbnail = ({ image, style }: CardThumbnailProps) => {
  const { layout, variant } = useCardContext();

  const ratio = ratioByVariantLayout[variant][layout];
  const shape: ThumbnailShapeProps =
    ratio === "1:1"
      ? { ratio: "1:1", cornerStyle: "angular" }
      : { ratio, orientation: orientationByLayout[layout], cornerStyle: "angular" };

  return (
    <div className={styles.imageContainer({ layout, variant })} style={style}>
      <Thumbnail
        src={image.src}
        alt={image.alt}
        appearance={variant === "plate" ? "hollow" : "outlined"}
        {...shape}
      />
    </div>
  );
};

CardThumbnail.displayName = "CardThumbnail";
