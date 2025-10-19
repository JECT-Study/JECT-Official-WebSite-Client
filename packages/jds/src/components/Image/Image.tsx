import { ComponentPropsWithoutRef, forwardRef, SyntheticEvent } from 'react';
import { IconDiv, ImageButton, ImageLabelDiv, StyledIcon, StyledLabel } from './Image.style';

export type ImgRatio = '1:1' | '4:5' | '3:4' | '2:3' | '9:16' | '1:2' | '9:21';
export type ImgOrientation = 'portrait' | 'landscape';

export interface ImageProps extends ComponentPropsWithoutRef<'button'> {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  ratio?: ImgRatio;
  orientation?: ImgOrientation;
  isReadonly?: boolean;
  badgeVisible?: boolean;
  badgeLabel?: string;
  loading?: 'lazy' | 'eager';
}

export const Image = forwardRef<HTMLButtonElement, ImageProps>(
  (
    {
      src,
      fallbackSrc = '/images/defaultImage.png',
      ratio = '1:1',
      orientation = 'portrait',
      isReadonly = false,
      badgeVisible = false,
      badgeLabel = '1',
      alt,
      loading = 'eager',
      ...props
    },
    ref,
  ) => {
    const imageLoadErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      if (e.currentTarget.src !== fallbackSrc) {
        e.currentTarget.src = fallbackSrc;
      }
    };

    return (
      <ImageButton
        ref={ref}
        ratio={ratio}
        orientation={orientation}
        isReadonly={isReadonly}
        disabled={isReadonly}
        {...props}
      >
        <img src={src || fallbackSrc} alt={alt} onError={imageLoadErrorHandler} loading={loading} />
        {badgeVisible && (
          <ImageLabelDiv>
            <StyledLabel size='xs' textAlign='center' weight='normal'>
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

Image.displayName = 'Image';
