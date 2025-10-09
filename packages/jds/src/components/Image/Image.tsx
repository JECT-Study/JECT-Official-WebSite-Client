import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { IconDiv, ImageButton, ImageLabelDiv } from './Image.style';
import { Icon } from '../Icon';
import { useTheme } from 'theme';
import { Label } from '../Label';

export type ImgRatio = '1:1' | '4:5' | '3:4' | '2:3' | '9:16' | '1:2' | '9:21';
export type ImgOrientation = 'portrait' | 'landscape';

interface ImageProps extends ComponentPropsWithoutRef<'button'> {
  src?: string;
  alt: string;
  ratio?: ImgRatio;
  orientation?: ImgOrientation;
  isReadonly?: boolean;
  badgeVisible?: boolean;
  badgeLabel?: string;
}

export const Image = forwardRef<HTMLButtonElement, ImageProps>(
  (
    {
      ratio = '1:1',
      orientation = 'portrait',
      isReadonly = false,
      badgeVisible = false,
      badgeLabel = '1',
      src,
      alt,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const imageSrc = src || '/images/defaultImage.png';

    return (
      <ImageButton
        ref={ref}
        ratio={ratio}
        orientation={orientation}
        isReadonly={isReadonly}
        disabled={isReadonly}
        {...props}
      >
        <img src={imageSrc} alt={alt} />
        {badgeVisible && (
          <ImageLabelDiv>
            <Label
              size='xs'
              textAlign='center'
              weight='normal'
              color={theme.color.object.static.inverse.boldest}
            >
              {badgeLabel}
            </Label>
          </ImageLabelDiv>
        )}
        {!isReadonly && (
          <IconDiv className='hoverIcon'>
            <Icon
              name='delete-bin-line'
              size='xl'
              color={theme.color.object.static.inverse.boldest}
            />
          </IconDiv>
        )}
      </ImageButton>
    );
  },
);

Image.displayName = 'Image';
