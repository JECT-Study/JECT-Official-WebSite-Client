import { forwardRef } from 'react';

import { Image } from '../../Image/Image';
import { useCardContext } from '../Card.context';
import type { CardImageProps } from '../Card.types';
import { StyledCardImageContainer } from './compound.styles';

/**
 * @description
 * Card의 이미지 컴포넌트입니다.
 * Context를 통해 layout, variant, titleVariant에 따라 자동으로 ratio와 orientation이 설정됩니다.
 * Image 컴포넌트를 isReadonly={true}, as="div"로 사용하여 ratio, badge 등의 기능을 제공합니다.
 *
 * @example
 * // 자동 설정 (디자인 에셋 기준)
 * <Card.Image src="/image.jpg" alt="Description" />
 *
 * // 수동 override
 * <Card.Image src="/image.jpg" alt="Description" ratio="4:5" orientation="portrait" />
 *
 */
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
    const { layout, variant, cardStyle, titleVariant } = useCardContext();

    const orientationMap = {
      vertical: 'landscape' as const,
      horizontal: 'portrait' as const,
    };
    const defaultOrientation = orientationMap[layout];

    const ratioBaseMap = {
      plate: {
        vertical: {
          title: '2:3' as const,
          label: '2:3' as const,
          none: '1:2' as const,
        },
        horizontal: '1:1' as const,
      },
      post: {
        vertical: '1:2' as const,
        horizontal: '1:1' as const,
      },
    };

    const defaultRatioMap = {
      plate: {
        vertical: ratioBaseMap.plate.vertical[titleVariant],
        horizontal: ratioBaseMap.plate.horizontal,
      },
      post: {
        vertical: ratioBaseMap.post.vertical,
        horizontal: ratioBaseMap.post.horizontal,
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
          {...restProps}
        />
      </StyledCardImageContainer>
    );
  },
);

CardImage.displayName = 'Card.Image';
