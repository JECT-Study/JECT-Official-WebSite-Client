import { forwardRef } from 'react';

import { Image } from '../../Image/Image';
import { useCardContext } from '../Card.context';
import type { CardImageProps } from '../Card.types';
import { StyledCardImageContainer } from './compound.styles';

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  (
    {
      src,
      alt,
      fallbackSrc = '/images/defaultImage.png',
      ratio,
      orientation,
      badgeVisible = false,
      badgeLabel,
      loading = 'lazy',
      ...restProps
    },
    ref,
  ) => {
    const { layout, variant, cardStyle } = useCardContext();

    const orientationMap = {
      vertical: 'landscape' as const,
      horizontal: 'portrait' as const,
    };
    const defaultOrientation = orientationMap[layout];

    //Todo: plate형태에 vertical일 때 title, label이 없을 경우 1:2 비율로 처리해야함
    const defaultRatioMap = {
      plate: {
        vertical: '2:3' as const,
        horizontal: '1:1' as const,
      },
      post: {
        vertical: '1:2' as const,
        horizontal: '1:1' as const,
      },
    };

    const defaultRatio = defaultRatioMap[variant][layout];

    return (
      <StyledCardImageContainer $layout={layout} $variant={variant} $cardStyle={cardStyle}>
        <Image
          ref={ref}
          as='div'
          isReadonly={true}
          src={src}
          alt={alt}
          fallbackSrc={fallbackSrc}
          ratio={ratio ?? defaultRatio}
          orientation={orientation ?? defaultOrientation}
          badgeVisible={badgeVisible}
          badgeLabel={badgeLabel}
          loading={loading}
          style={variant === 'plate' ? { border: 'none', borderRadius: 0 } : { borderRadius: 0 }}
          {...restProps}
        />
      </StyledCardImageContainer>
    );
  },
);

CardImage.displayName = 'Card.Image';
