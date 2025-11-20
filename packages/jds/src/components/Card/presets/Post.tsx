import type { ElementType } from 'react';

import { Icon } from '../../Icon';
import type { PostPresetProps } from '../Card.types';
import {
  CardRoot,
  CardImage,
  CardContent,
  CardTitle,
  CardBody,
  CardMeta,
  CardMetaItem,
  CardMetaNudgeItem,
} from '../compound';

import { PolymorphicForwardRef } from '@/utils/forwardRef';

export const Post = PolymorphicForwardRef<'div', PostPresetProps>(
  (
    {
      as,
      layout = 'vertical',
      cardStyle = 'outlined',
      isDisabled = false,
      image,
      title,
      body,
      author,
      date,
      ...restProps
    },
    ref,
  ) => {
    const Component = as || ('div' as ElementType);

    return (
      <Component ref={ref} {...restProps}>
        <CardRoot layout={layout} variant='post' cardStyle={cardStyle} isDisabled={isDisabled}>
          {image && <CardImage src={image.src} alt={image.alt} />}
          <CardContent>
            <CardTitle>{title}</CardTitle>
            <CardBody>{body}</CardBody>
            <CardMeta>
              <CardMetaItem>{author}</CardMetaItem>
              <CardMetaItem>{date}</CardMetaItem>
              <CardMetaNudgeItem label={layout === 'vertical' ? '더보기' : undefined}>
                <Icon name='arrow-right-s-line' size='xs' />
              </CardMetaNudgeItem>
            </CardMeta>
          </CardContent>
        </CardRoot>
      </Component>
    );
  },
);

Post.displayName = 'Card.Preset.Post';
