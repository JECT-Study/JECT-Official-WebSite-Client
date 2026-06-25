import * as styles from "./card.css";
import { Thumbnail, type ThumbnailShapeProps } from "../../Thumbnail";
import { useCardContext } from "../Card.context";
import type { CardThumbnailImage } from "../Card.types";

interface CardThumbnailProps {
  image: CardThumbnailImage;
}

const ratioByVariantLayout = {
  plate: { vertical: "3:4", horizontal: "1:1" },
  post: { vertical: "1:2", horizontal: "1:1" },
} as const;

export const CardThumbnail = ({ image }: CardThumbnailProps) => {
  const { layout, variant } = useCardContext();

  const ratio = ratioByVariantLayout[variant][layout];
  const shape: ThumbnailShapeProps =
    ratio === "1:1" ? { ratio: "1:1" } : { ratio, orientation: "landscape" };

  return (
    <div className={styles.imageContainer({ layout, variant })}>
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

CardThumbnail.displayName = "Card.Thumbnail";
