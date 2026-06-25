import { forwardRef, type ReactNode } from "react";

import type { CardThumbnailImage, PostPresetProps } from "../Card.types";
import { CardThumbnail, CardContent, CardMeta, CardMetaItem, CardOverlay } from "../compound";
import { PresetFrame, TitleBody } from "./shared";

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
  const thumbnail = image && <CardThumbnail image={image} />;

  return (
    <>
      {layout === "vertical" && thumbnail}
      <CardContent>
        <TitleBody title={title} body={body} />
        <CardMeta>
          <CardMetaItem>{author}</CardMetaItem>
          <CardMetaItem>{date}</CardMetaItem>
        </CardMeta>
      </CardContent>
      {layout === "horizontal" && thumbnail}
    </>
  );
};

export const PostLink = forwardRef<HTMLDivElement, PostLinkProps>(
  ({ layout = "vertical", isDisabled = false, href, target, rel, ...contentProps }, ref) => (
    <PresetFrame
      ref={ref}
      layout={layout}
      variant='post'
      isDisabled={isDisabled}
      overlay={<CardOverlay as='a' href={href} target={target} rel={rel} />}
    >
      <PostContent layout={layout} {...contentProps} />
    </PresetFrame>
  ),
);

PostLink.displayName = "Card.Preset.Post.Link";

export const PostButton = forwardRef<HTMLDivElement, PostButtonProps>(
  ({ layout = "vertical", isDisabled = false, onClick, type, ...contentProps }, ref) => (
    <PresetFrame
      ref={ref}
      layout={layout}
      variant='post'
      isDisabled={isDisabled}
      overlay={<CardOverlay as='button' onClick={onClick} type={type || "button"} />}
    >
      <PostContent layout={layout} {...contentProps} />
    </PresetFrame>
  ),
);

PostButton.displayName = "Card.Preset.Post.Button";

export const Post = {
  Link: PostLink,
  Button: PostButton,
};
