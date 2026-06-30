import { forwardRef, type ReactNode } from "react";

import type { PlatePresetBaseProps, PlatePresetProps } from "../card.types";
import { CardThumbnail, CardContent, CardCaption, CardOverlay } from "../compound";
import { PresetFrame, TitleBody } from "./shared";

type PlateLinkProps = Omit<Extract<PlatePresetProps, { as: "a" }>, "as">;
type PlateButtonProps = Omit<Extract<PlatePresetProps, { as: "button" }>, "as">;
type PlateBaseProps = PlatePresetBaseProps & { overlay: ReactNode };

const PlateBase = forwardRef<HTMLDivElement, PlateBaseProps>(
  ({ image, caption, title, body, overlay, ...frameProps }, ref) => {
    const thumbnailImage = image ?? { alt: title };

    return (
      <PresetFrame ref={ref} variant='plate' overlay={overlay} {...frameProps}>
        <CardThumbnail image={thumbnailImage} />
        <CardContent>
          <TitleBody title={title} body={body} />
          {caption && <CardCaption>{caption}</CardCaption>}
        </CardContent>
      </PresetFrame>
    );
  },
);

PlateBase.displayName = "Card.Preset.Plate.Base";

export const PlateLink = forwardRef<HTMLDivElement, PlateLinkProps>(
  ({ href, target, rel, ...rest }, ref) => (
    <PlateBase
      ref={ref}
      overlay={<CardOverlay as='a' href={href} target={target} rel={rel} />}
      {...rest}
    />
  ),
);

PlateLink.displayName = "Card.Preset.Plate.Link";

export const PlateButton = forwardRef<HTMLDivElement, PlateButtonProps>(
  ({ onClick, type, ...rest }, ref) => (
    <PlateBase
      ref={ref}
      overlay={<CardOverlay as='button' onClick={onClick} type={type} />}
      {...rest}
    />
  ),
);

PlateButton.displayName = "Card.Preset.Plate.Button";

export const Plate = {
  Link: PlateLink,
  Button: PlateButton,
};
