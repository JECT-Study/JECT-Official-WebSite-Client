import { forwardRef, type ReactNode } from "react";
import { pxToRem } from "utils";

import type { PostPresetProps } from "../Card.types";
import {
  CardRoot,
  CardImage,
  CardContent,
  CardTitle,
  CardBody,
  CardMeta,
  CardMetaItem,
  CardOverlay,
} from "../compound";
import * as styles from "../compound/compound.css";

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
        {image && <CardImage src={image.src} alt={image.alt} ratio='1:2' />}
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardBody>{body}</CardBody>
          <CardMeta>
            <CardMetaItem>{author}</CardMetaItem>
            <CardMetaItem>{date}</CardMetaItem>
          </CardMeta>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardContent>
        <div className={styles.horizontalCardPostLayout}>
          <div className={styles.horizontalPostContentWrap}>
            <div className={styles.contentMain}>
              <CardTitle>{title}</CardTitle>
              <CardBody>{body}</CardBody>
            </div>
            <CardMeta>
              <CardMetaItem>{author}</CardMetaItem>
              <CardMetaItem>{date}</CardMetaItem>
            </CardMeta>
          </div>
          {image && (
            <CardImage
              src={image.src}
              alt={image.alt}
              ratio='1:1'
              style={{ width: pxToRem(80), height: pxToRem(80) }}
            />
          )}
        </div>
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
      <CardOverlay as='a' href={href} target={target} rel={rel} data-overlay />
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
      <CardOverlay as='button' onClick={onClick} type={type || "button"} data-overlay />
    </CardRoot>
  ),
);

PostButton.displayName = "Card.Preset.Post.Button";

export const Post = {
  Link: PostLink,
  Button: PostButton,
};
