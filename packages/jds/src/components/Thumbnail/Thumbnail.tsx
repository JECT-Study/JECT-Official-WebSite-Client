import { clsx } from "clsx";
import { Slot } from "radix-ui";
import { type Ref, forwardRef, useState } from "react";

import { thumbnailStyles } from "./thumbnail.css";
import type { ThumbnailProps } from "./thumbnail.types";
import { ThumbnailFallback } from "./ThumbnailFallback";

// @todo 썸네일/이미지 합성 컴포넌트에서 재사용 시 공용 커스텀 훅으로 분리
function useImageStatus(src: string | undefined) {
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);
  return {
    isFallbackVisible: !src || erroredSrc === src,
    onError: () => setErroredSrc(src ?? null),
  };
}

export const Thumbnail = forwardRef<HTMLElement, ThumbnailProps>(
  (
    {
      asChild = false,
      src,
      alt,
      loading = "lazy",
      fallback = <ThumbnailFallback />,
      ratio = "1:1",
      orientation = "portrait",
      cornerStyle = "curved",
      appearance = "outlined",
      className,
      children,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { isFallbackVisible, onError } = useImageStatus(src);

    // @todo 이미지 렌더링(next/image 등)에 대한 DS의 대응 범위는 추가 논의 필요
    const content = isFallbackVisible ? (
      fallback
    ) : (
      <img
        data-part='image'
        src={src}
        alt={alt}
        loading={loading}
        onError={onError}
        className={thumbnailStyles.image}
      />
    );

    const sharedProps = {
      "data-part": "root" as const,
      className: clsx(
        thumbnailStyles.root({ ratio, orientation, cornerStyle, appearance }),
        className,
      ),
    };

    if (asChild) {
      return (
        <Slot.Root ref={forwardedRef} {...sharedProps} {...restProps}>
          <Slot.Slottable>{children}</Slot.Slottable>
          {content}
        </Slot.Root>
      );
    }

    return (
      <div
        ref={forwardedRef as Ref<HTMLDivElement>}
        {...sharedProps}
        {...(isFallbackVisible && { role: "img", "aria-label": alt })}
        {...restProps}
      >
        {content}
      </div>
    );
  },
);

Thumbnail.displayName = "Thumbnail";
