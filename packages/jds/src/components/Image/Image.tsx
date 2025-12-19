import type { ElementType, SyntheticEvent } from "react";

import { IconDiv, ImageButton, ImageLabelDiv, StyledIcon, StyledLabel } from "./Image.style";

import { PolymorphicForwardRef } from "@/utils/forwardRef";

export type ImgRatio = "1:1" | "4:5" | "3:4" | "2:3" | "9:16" | "1:2" | "9:21";
export type ImgOrientation = "portrait" | "landscape";

export interface ImageOwnProps {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  ratio?: ImgRatio;
  orientation?: ImgOrientation;
  isReadonly?: boolean;
  badgeVisible?: boolean;
  badgeLabel?: string;
  loading?: "lazy" | "eager";
}

export const Image = PolymorphicForwardRef<"button", ImageOwnProps>(
  (
    {
      as,
      src,
      fallbackSrc = "/images/defaultImage.png",
      ratio = "1:1",
      orientation = "portrait",
      isReadonly = false,
      badgeVisible = false,
      badgeLabel = "1",
      alt,
      loading = "eager",
      ...props
    },
    ref,
  ) => {
    const Component = as || ("button" as ElementType);
    const imageLoadErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      if (e.currentTarget.src !== fallbackSrc) {
        e.currentTarget.src = fallbackSrc;
      }
    };

    return (
      <ImageButton
        ref={ref}
        as={Component}
        ratio={ratio}
        orientation={orientation}
        isReadonly={isReadonly}
        disabled={!isReadonly ? undefined : true}
        {...props}
      >
        <img src={src || fallbackSrc} alt={alt} onError={imageLoadErrorHandler} loading={loading} />
        {badgeVisible && (
          <ImageLabelDiv>
            <StyledLabel as='span' size='xs' textAlign='center' weight='normal'>
              {badgeLabel}
            </StyledLabel>
          </ImageLabelDiv>
        )}
        {!isReadonly && (
          <IconDiv className='hoverIcon'>
            <StyledIcon name='delete-bin-line' size='xl' />
          </IconDiv>
        )}
      </ImageButton>
    );
  },
);

Image.displayName = "Image";
