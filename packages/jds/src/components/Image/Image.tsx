import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { IconDiv, ImageButton } from './Image.style';
import { Icon } from '../Icon';
import { useTheme } from 'theme';

export type ImgRatio = '1:1' | '4:5' | '3:4' | '2:3' | '9:16' | '1:2' | '9:21';

export type ImgOrientation = 'portrait' | 'landscape';

interface ImageProps extends ComponentPropsWithoutRef<'button'> {
  src?: string;
  alt: string;
  ratio?: ImgRatio;
  orientation?: ImgOrientation;
  isReadonly?: boolean;
  badgeVisible?: boolean;
}

export const Image = forwardRef<HTMLButtonElement, ImageProps>(
  (
    {
      ratio = '1:1',
      orientation = 'portrait',
      isReadonly = false,
      badgeVisible = false,
      src,
      alt,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const imageSrc = src || 'src/assets/images/defaultImage.png';

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
        {!isReadonly && (
          <IconDiv className='hoverIcon'>
            <Icon name='delete-bin-line' size='xl' color={theme.color.object.boldest} />
          </IconDiv>
        )}
      </ImageButton>
    );
  },
);

Image.displayName = 'Image';
