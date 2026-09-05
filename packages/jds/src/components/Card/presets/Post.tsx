import { forwardRef, type ReactNode } from "react";

import type { PostPresetBaseProps, PostLinkProps, PostButtonProps } from "../card.types";
import { CardThumbnail, CardContent, CardMeta, CardMetaItem, CardOverlay } from "../compound";
import { PresetFrame, TitleBody } from "./shared";

interface PostBaseProps extends PostPresetBaseProps {
  overlay: ReactNode;
}

const PostBase = forwardRef<HTMLDivElement, PostBaseProps>(
  ({ layout = "vertical", image, title, body, author, date, overlay, ...frameProps }, ref) => {
    const thumbnail = image && <CardThumbnail image={image} />;

    return (
      <PresetFrame ref={ref} layout={layout} variant='post' overlay={overlay} {...frameProps}>
        {layout === "vertical" && thumbnail}
        <CardContent>
          <TitleBody title={title} body={body} />
          <CardMeta>
            <CardMetaItem>{author}</CardMetaItem>
            <CardMetaItem>{date}</CardMetaItem>
          </CardMeta>
        </CardContent>
        {layout === "horizontal" && thumbnail}
      </PresetFrame>
    );
  },
);

PostBase.displayName = "Card.Preset.Post.Base";

export const PostLink = forwardRef<HTMLDivElement, PostLinkProps>(
  ({ href, target, rel, ...rest }, ref) => (
    <PostBase
      ref={ref}
      overlay={<CardOverlay as='a' href={href} target={target} rel={rel} />}
      {...rest}
    />
  ),
);

PostLink.displayName = "Card.Preset.Post.Link";

export const PostButton = forwardRef<HTMLDivElement, PostButtonProps>(
  ({ onClick, type, ...rest }, ref) => (
    <PostBase
      ref={ref}
      overlay={<CardOverlay as='button' onClick={onClick} type={type} />}
      {...rest}
    />
  ),
);

PostButton.displayName = "Card.Preset.Post.Button";

export const Post = {
  Link: PostLink,
  Button: PostButton,
};
