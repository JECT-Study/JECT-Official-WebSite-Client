import { forwardRef, type ReactNode } from "react";
import { pxToRem } from "utils";

import { Icon } from "../../Icon";
import type { PostPresetProps } from "../Card.types";
import {
  CardRoot,
  CardImage,
  CardContent,
  CardTitle,
  CardBody,
  CardMeta,
  CardMetaItem,
  CardMetaNudgeItem,
} from "../compound";
import {
  StyledCardOverlay,
  StyledHorizontalCardPostLayout,
  StyledHorizontalPostContentWrap,
} from "../compound/compound.styles";

type PostLinkProps = Omit<Extract<PostPresetProps, { as: "a" }>, "as">;
type PostButtonProps = Omit<Extract<PostPresetProps, { as: "button" }>, "as">;

interface PostContentProps {
  layout: "vertical" | "horizontal";
  image?: { src?: string; alt: string };
  title: string;
  body: ReactNode;
  author: string;
  date: string;
}

const PostContent = ({ layout, image, title, body, author, date }: PostContentProps) => {
  if (layout === "vertical") {
    return (
      <>
        <CardContent>
          {image && <CardImage src={image.src} alt={image.alt} ratio='1:2' />}
          <CardTitle>{title}</CardTitle>
          <CardBody>{body}</CardBody>
          <CardMeta>
            <CardMetaItem>{author}</CardMetaItem>
            <CardMetaItem>{date}</CardMetaItem>
            <CardMetaNudgeItem label={"더보기"}>
              <Icon name='arrow-right-s-line' size='xs' />
            </CardMetaNudgeItem>
          </CardMeta>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardContent>
        <StyledHorizontalCardPostLayout>
          <StyledHorizontalPostContentWrap>
            <CardTitle>{title}</CardTitle>
            <CardBody>{body}</CardBody>
          </StyledHorizontalPostContentWrap>
          {image && (
            <CardImage
              src={image.src}
              alt={image.alt}
              ratio='1:1'
              style={{ width: pxToRem(80), height: pxToRem(80) }}
            />
          )}
        </StyledHorizontalCardPostLayout>
        <CardMeta>
          <CardMetaItem>{author}</CardMetaItem>
          <CardMetaItem>{date}</CardMetaItem>
          <CardMetaNudgeItem>
            <Icon name='arrow-right-s-line' size='xs' />
          </CardMetaNudgeItem>
        </CardMeta>
      </CardContent>
    </>
  );
};

export const PostLink = forwardRef<HTMLDivElement, PostLinkProps>(
  (
    {
      layout = "vertical",
      cardStyle = "outlined",
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
      <StyledCardOverlay
        as='a'
        href={href}
        target={target}
        rel={rel}
        data-overlay
        $variant='post'
        $cardStyle={cardStyle}
        $isDisabled={isDisabled}
      />
    </CardRoot>
  ),
);

PostLink.displayName = "Card.Preset.Post.Link";

export const PostButton = forwardRef<HTMLDivElement, PostButtonProps>(
  (
    {
      layout = "vertical",
      cardStyle = "outlined",
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
      <StyledCardOverlay
        as='button'
        onClick={onClick}
        type={type || "button"}
        data-overlay
        $variant='post'
        $cardStyle={cardStyle}
        $isDisabled={isDisabled}
      />
    </CardRoot>
  ),
);

PostButton.displayName = "Card.Preset.Post.Button";

export const Post = {
  Link: PostLink,
  Button: PostButton,
};
