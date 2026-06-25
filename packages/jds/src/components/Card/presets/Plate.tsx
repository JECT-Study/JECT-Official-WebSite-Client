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
  ({ layout, isDisabled, href, target, rel, ...contentProps }, ref) => (
    <PresetFrame
      ref={ref}
      layout={layout}
      variant='plate'
      isDisabled={isDisabled}
      overlay={<CardOverlay as='a' href={href} target={target} rel={rel} />}
    >
      <PlateContent {...contentProps} />
    </PresetFrame>
  ),
);

PlateLink.displayName = "Card.Preset.Plate.Link";

export const PlateButton = forwardRef<HTMLDivElement, PlateButtonProps>(
  ({ layout, isDisabled, onClick, type, ...contentProps }, ref) => (
    <PresetFrame
      ref={ref}
      layout={layout}
      variant='plate'
      isDisabled={isDisabled}
      overlay={<CardOverlay as='button' onClick={onClick} type={type || "button"} />}
    >
      <PlateContent {...contentProps} />
    </PresetFrame>
  ),
);

PlateButton.displayName = "Card.Preset.Plate.Button";

export const Plate = {
  Link: PlateLink,
  Button: PlateButton,
};
