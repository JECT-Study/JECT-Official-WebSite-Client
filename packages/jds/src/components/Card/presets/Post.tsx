import { forwardRef, type ReactNode } from "react";

import type { CardThumbnailImage, PostPresetProps } from "../Card.types";
import {
  CardRoot,
  CardThumbnail,
  CardContent,
  CardTitle,
  CardBody,
  CardMeta,
  CardMetaItem,
  CardOverlay,
} from "../compound";
import * as styles from "../compound/card.css";

type PostLinkProps = Omit<Extract<PostPresetProps, { as: "a" }>, "as">;
type PostButtonProps = Omit<Extract<PostPresetProps, { as: "button" }>, "as">;

interface PostContentProps {
  layout: "vertical" | "horizontal";
  image?: CardThumbnailImage;
  title: string;
  body: ReactNode;
  author: string;
  date: string;
}

const PostContent = ({ layout, image, title, body, author, date }: PostContentProps) => {
  if (layout === "vertical") {
    return (
      <>
        {image && <CardThumbnail image={image} />}
        <CardContent>
          <div className={styles.contentGroup}>
            <CardTitle>{title}</CardTitle>
            <CardBody>{body}</CardBody>
          </div>
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
        <div className={styles.horizontalPostLayout}>
          <div className={styles.horizontalPostContentWrap}>
            <div className={styles.contentGroup}>
              <CardTitle>{title}</CardTitle>
              <CardBody>{body}</CardBody>
            </div>
            <CardMeta>
              <CardMetaItem>{author}</CardMetaItem>
              <CardMetaItem>{date}</CardMetaItem>
            </CardMeta>
          </div>
          {image && <CardThumbnail image={image} />}
        </div>
      </CardContent>
    </>
  );
};

export const PostLink = forwardRef<HTMLDivElement, PostLinkProps>(
  ({ layout = "vertical", isDisabled = false, href, target, rel, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='post' isDisabled={isDisabled} interactive>
      <PostContent layout={layout} {...contentProps} />
      <CardOverlay as='a' href={href} target={target} rel={rel} />
    </CardRoot>
  ),
);

PostLink.displayName = "Card.Preset.Post.Link";

export const PostButton = forwardRef<HTMLDivElement, PostButtonProps>(
  ({ layout = "vertical", isDisabled = false, onClick, type, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='post' isDisabled={isDisabled} interactive>
      <PostContent layout={layout} {...contentProps} />
      <CardOverlay as='button' onClick={onClick} type={type || "button"} />
    </CardRoot>
  ),
);

PostButton.displayName = "Card.Preset.Post.Button";

export const Post = {
  Link: PostLink,
  Button: PostButton,
};
