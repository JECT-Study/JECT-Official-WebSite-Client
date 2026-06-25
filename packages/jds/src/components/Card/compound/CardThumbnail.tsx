import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./card.css";
import { Thumbnail, type ThumbnailShapeProps } from "../../Thumbnail";
import type { CardThumbnailProps } from "../Card.types";
import { useCardContext } from "../cardContext";

const ratioByVariantLayout = {
  plate: { vertical: "3:4", horizontal: "1:1" },
  post: { vertical: "1:2", horizontal: "1:1" },
} as const;

export const CardThumbnail = forwardRef<HTMLDivElement, CardThumbnailProps>(
  ({ image, className, ...restProps }, ref) => {
    const { layout, variant } = useCardContext("Card.Thumbnail");

    const ratio = ratioByVariantLayout[variant][layout];
    const shape: ThumbnailShapeProps =
      ratio === "1:1" ? { ratio: "1:1" } : { ratio, orientation: "landscape" };

    return (
      <div
        ref={ref}
        className={clsx(styles.imageContainer({ layout, variant }), className)}
        {...restProps}
      >
        <Thumbnail
          src={image.src}
          alt={image.alt}
          appearance={variant === "plate" ? "hollow" : "outlined"}
          cornerStyle='angular'
          {...shape}
        />
      </div>
    );
  },
);

CardThumbnail.displayName = "Card.Thumbnail";
