import { forwardRef } from "react";

import { StyledCardImageContainer } from "./compound.styles";
import { Thumbnail, type ThumbnailShapeProps } from "../../Thumbnail";
import { useCardContext } from "../Card.context";
import type { CardImageProps } from "../Card.types";

/**
 * @deprecated `CardImage`는 레거시 컴포넌트입니다. Card 컴파운드 재구성 시 제거/대체될 예정이며,
 * 새 구현에서는 `Thumbnail`을 직접 사용하세요. 하위 호환을 위해 한시적으로 유지됩니다.
 * @see Thumbnail
 */
export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  (
    {
      src,
      alt,
      fallback,
      ratio,
      orientation,
      badgeVisible = false,
      badgeLabel,
      loading = "lazy",
      style: customStyle,
      ...restProps
    },
    ref,
  ) => {
    const { layout, variant, cardStyle } = useCardContext();

    const orientationMap = {
      vertical: "landscape" as const,
      horizontal: "portrait" as const,
    };
    const defaultOrientation = orientationMap[layout];

    const defaultRatioMap = {
      plate: {
        vertical: "3:4" as const,
        horizontal: "1:1" as const,
      },
      post: {
        vertical: "1:2" as const,
        horizontal: "1:1" as const,
      },
    };

    const defaultRatio = defaultRatioMap[variant][layout];
    const finalRatio = ratio ?? defaultRatio;
    const finalOrientation = orientation ?? defaultOrientation;

    const shape: ThumbnailShapeProps =
      finalRatio === "1:1"
        ? { ratio: "1:1", orientation: "portrait", cornerStyle: "angular" }
        : { ratio: finalRatio, orientation: finalOrientation, cornerStyle: "angular" };

    return (
      <StyledCardImageContainer
        ref={ref}
        $layout={layout}
        $variant={variant}
        $cardStyle={cardStyle}
        style={customStyle}
      >
        <Thumbnail
          src={src}
          alt={alt}
          fallback={fallback}
          appearance={variant === "plate" ? "hollow" : "outlined"}
          loading={loading}
          {...restProps}
          {...shape}
        />
        {badgeVisible && badgeLabel && (
          <span
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              zIndex: 1,
              minWidth: "18px",
              padding: "0 6px",
              borderRadius: "2px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
              fontSize: "12px",
              lineHeight: "18px",
              textAlign: "center",
            }}
          >
            {badgeLabel}
          </span>
        )}
      </StyledCardImageContainer>
    );
  },
);

CardImage.displayName = "Card.Image";
