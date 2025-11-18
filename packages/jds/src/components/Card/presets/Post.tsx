import { forwardRef } from 'react';

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

/**
 * @description
 * 카드의 Post 프리셋입니다.
 * 이미지(선택), 제목(필수), 본문(필수), 메타 정보(작성자, 날짜)로 구성됩니다.
 *
 * hover/active 시 우측에 화살표 아이콘이 나타나며 nudge 효과가 적용됩니다:
 * - Vertical 레이아웃: "더보기" 레이블 + 화살표 아이콘
 * - Horizontal 레이아웃: 화살표 아이콘만
 *
 */
export const Post = forwardRef<HTMLDivElement, PostPresetProps>(
  (
    {
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
    return (
      <CardRoot
        ref={ref}
        layout={layout}
        variant='post'
        cardStyle={cardStyle}
        isDisabled={isDisabled}
        {...restProps}
      >
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
    );
  },
);

Post.displayName = 'Card.Preset.Post';
