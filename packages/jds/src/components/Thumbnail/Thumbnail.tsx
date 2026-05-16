import { clsx } from "clsx";
import { Slot } from "radix-ui";
import { type Ref, type SyntheticEvent, forwardRef } from "react";

import { thumbnailStyles } from "./thumbnail.css";
import type { ThumbnailProps } from "./thumbnail.types";

const DEFAULT_FALLBACK_SRC = "/images/defaultImage.png";

export const Thumbnail = forwardRef<HTMLElement, ThumbnailProps>(
  (
    {
      asChild = false,
      src,
      alt,
      fallbackSrc = DEFAULT_FALLBACK_SRC,
      loading = "eager",
      // ratio / orientation / cornerStyle / appearance defaults는
      // thumbnail.css.ts의 `defaultVariants`가 SSOT — undefined로 두면 recipe가 폴백
      ratio,
      orientation,
      cornerStyle,
      appearance,
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const Comp = asChild ? Slot.Root : "div";

    const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
      if (e.currentTarget.src !== fallbackSrc) {
        e.currentTarget.src = fallbackSrc;
      }
    };

    return (
      <Comp
        ref={forwardedRef as Ref<HTMLDivElement>}
        {...restProps}
        data-part='root'
        className={clsx(
          thumbnailStyles.root({ ratio, orientation, cornerStyle, appearance }),
          className,
        )}
      >
        <img
          data-part='image'
          src={src || fallbackSrc}
          alt={alt}
          loading={loading}
          onError={handleError}
          className={thumbnailStyles.image}
        />
      </Comp>
    );
  },
);

Thumbnail.displayName = "Thumbnail";
