import { thumbnailStyles } from "./thumbnail.css";
import defaultImage from "../../assets/images/defaultImage.png";

export function ThumbnailFallback() {
  return (
    <img
      data-part='fallback'
      src={defaultImage}
      alt=''
      aria-hidden='true'
      className={thumbnailStyles.image}
    />
  );
}

ThumbnailFallback.displayName = "ThumbnailFallback";
