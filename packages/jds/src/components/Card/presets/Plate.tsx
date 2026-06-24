import { forwardRef, type ReactNode } from "react";

import type { PlatePresetProps } from "../Card.types";
import {
  CardRoot,
  CardThumbnail,
  CardContent,
  CardCaption,
  CardTitle,
  CardBody,
  CardOverlay,
} from "../compound";

type PlateLinkProps = Omit<Extract<PlatePresetProps, { as: "a" }>, "as">;
type PlateButtonProps = Omit<Extract<PlatePresetProps, { as: "button" }>, "as">;

interface PlateContentProps {
  image?: { src?: string; alt: string };
  caption?: string;
  title: string;
  body: ReactNode;
}

const PlateContent = ({ image, caption, title, body }: PlateContentProps) => (
  <>
    {image && <CardThumbnail image={image} />}
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardBody>{body}</CardBody>
      {caption && <CardCaption>{caption}</CardCaption>}
    </CardContent>
  </>
);

export const PlateLink = forwardRef<HTMLDivElement, PlateLinkProps>(
  ({ layout = "vertical", isDisabled = false, href, target, rel, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateContent {...contentProps} />
      <CardOverlay as='a' href={href} target={target} rel={rel} />
    </CardRoot>
  ),
);

PlateLink.displayName = "Card.Preset.Plate.Link";

export const PlateButton = forwardRef<HTMLDivElement, PlateButtonProps>(
  ({ layout = "vertical", isDisabled = false, onClick, type, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateContent {...contentProps} />
      <CardOverlay as='button' onClick={onClick} type={type || "button"} />
    </CardRoot>
  ),
);

PlateButton.displayName = "Card.Preset.Plate.Button";

export const Plate = {
  Link: PlateLink,
  Button: PlateButton,
};
