import { forwardRef, type ReactNode } from 'react';

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
import { StyledCardOverlay } from '../compound/compound.styles';

type PostLinkProps = Omit<Extract<PostPresetProps, { as: 'a' }>, 'as'>;
type PostButtonProps = Omit<Extract<PostPresetProps, { as: 'button' }>, 'as'>;

interface PostContentProps {
  layout: 'vertical' | 'horizontal';
  image?: { src?: string; alt: string };
  title: string;
  body: ReactNode;
  author: string;
  date: string;
}

const PostContent = ({ layout, image, title, body, author, date }: PostContentProps) => (
  <>
    {layout === 'vertical' && image && <CardImage src={image.src} alt={image.alt} />}
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
    {layout === 'horizontal' && image && <CardImage src={image.src} alt={image.alt} />}
  </>
);

export const PostLink = forwardRef<HTMLDivElement, PostLinkProps>(
  (
    {
      layout = 'vertical',
      cardStyle = 'outlined',
      isDisabled = false,
      href,
      target,
      rel,
      ...contentProps
    },
    ref,
  ) => (
    <CardRoot
      ref={ref}
      layout={layout}
      variant='post'
      cardStyle={cardStyle}
      isDisabled={isDisabled}
      interactive
    >
      <PostContent layout={layout} {...contentProps} />
      <StyledCardOverlay as='a' href={href} target={target} rel={rel} data-overlay />
    </CardRoot>
  ),
);

PostLink.displayName = 'Card.Preset.Post.Link';

export const PostButton = forwardRef<HTMLDivElement, PostButtonProps>(
  (
    {
      layout = 'vertical',
      cardStyle = 'outlined',
      isDisabled = false,
      onClick,
      type,
      ...contentProps
    },
    ref,
  ) => (
    <CardRoot
      ref={ref}
      layout={layout}
      variant='post'
      cardStyle={cardStyle}
      isDisabled={isDisabled}
      interactive
    >
      <PostContent layout={layout} {...contentProps} />
      <StyledCardOverlay as='button' onClick={onClick} type={type || 'button'} data-overlay />
    </CardRoot>
  ),
);

PostButton.displayName = 'Card.Preset.Post.Button';

export const Post = {
  Link: PostLink,
  Button: PostButton,
};
