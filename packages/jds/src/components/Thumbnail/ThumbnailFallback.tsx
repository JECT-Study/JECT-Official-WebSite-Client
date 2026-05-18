import { thumbnailStyles } from "./thumbnail.css";
import { Icon } from "../Icon";

export function ThumbnailFallback() {
  return (
    <div data-part='fallback' className={thumbnailStyles.fallback}>
      <Icon name='image-line' size='3xl' aria-hidden='true' />
    </div>
  );
}

ThumbnailFallback.displayName = "ThumbnailFallback";
