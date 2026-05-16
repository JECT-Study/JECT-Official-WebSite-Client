import { clsx } from "clsx";
import { Slot } from "radix-ui";
import { type Ref, forwardRef, useState } from "react";

import { thumbnailStyles } from "./thumbnail.css";
import type { ThumbnailProps } from "./thumbnail.types";
import { ThumbnailFallback } from "./ThumbnailFallback";

/**
 *@Todo 썸네일이나 이미지 사용하는 합성 컴포넌트 사용 시 해당 부분 커스텀 훅으로 분리
 * src 로드 실패를 추적해 fallback 노출 여부를 알려줌
 * src가 새 값으로 바뀌면 erroredSrc !== src 가 되어 자동 재시도(파생, useEffect 불필요)
 * 컴포넌트 본문에서 useState 메커니즘을 숨기고 의도(isFallbackVisible/onError)만 노출한다.
 */
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
      loading = "eager",
      fallback = <ThumbnailFallback />,
      ratio = "1:1",
      orientation = "portrait",
      cornerStyle = "curved",
      appearance = "outlined",
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const Comp = asChild ? Slot.Root : "div";
    const { isFallbackVisible, onError } = useImageStatus(src);

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
        {isFallbackVisible ? (
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
        )}
      </Comp>
    );
  },
);

Thumbnail.displayName = "Thumbnail";
