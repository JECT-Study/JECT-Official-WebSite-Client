import { forwardRef, type ReactNode } from "react";

import type { CardThumbnailImage, PlatePresetProps } from "../Card.types";
import { CardThumbnail, CardContent, CardCaption, CardOverlay } from "../compound";
import { PresetFrame, TitleBody } from "./shared";

type PlateLinkProps = Omit<Extract<PlatePresetProps, { as: "a" }>, "as">;
type PlateButtonProps = Omit<Extract<PlatePresetProps, { as: "button" }>, "as">;

interface PlateContentProps {
  image?: CardThumbnailImage;
  caption?: string;
  title: string;
  body: ReactNode;
}

const PlateContent = ({ image, caption, title, body }: PlateContentProps) => (
  <>
    {image && <CardThumbnail image={image} />}
    <CardContent>
      <TitleBody title={title} body={body} />
      {caption && <CardCaption>{caption}</CardCaption>}
    </CardContent>
  </>
);

export const PlateLink = forwardRef<HTMLDivElement, PlateLinkProps>(
  ({ layout, isDisabled, image, caption, title, body, href, target, rel, ...rest }, ref) => (
    <PresetFrame
      ref={ref}
      layout={layout}
      variant='plate'
      isDisabled={isDisabled}
      overlay={<CardOverlay as='a' href={href} target={target} rel={rel} />}
      {...rest}
    >
      <PlateContent image={image} caption={caption} title={title} body={body} />
    </PresetFrame>
  ),
);

PlateLink.displayName = "Card.Preset.Plate.Link";

export const PlateButton = forwardRef<HTMLDivElement, PlateButtonProps>(
  ({ layout, isDisabled, image, caption, title, body, onClick, type, ...rest }, ref) => (
    <PresetFrame
      ref={ref}
      layout={layout}
      variant='plate'
      isDisabled={isDisabled}
      overlay={<CardOverlay as='button' onClick={onClick} type={type} />}
      {...rest}
    >
      <PlateContent image={image} caption={caption} title={title} body={body} />
    </PresetFrame>
  ),
);

PlateButton.displayName = "Card.Preset.Plate.Button";

export const Plate = {
  Link: PlateLink,
  Button: PlateButton,
};
