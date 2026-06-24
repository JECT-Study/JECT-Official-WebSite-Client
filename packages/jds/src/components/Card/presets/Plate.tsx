import { forwardRef, type ReactNode } from "react";

import type { PlatePresetProps } from "../Card.types";
import { CardRoot, CardImage, CardContent, CardCaption, CardTitle, CardBody } from "../compound";
import { CardOverlay } from "../compound";

type PlateLinkProps = Omit<Extract<PlatePresetProps, { as: "a" }>, "as">;
type PlateButtonProps = Omit<Extract<PlatePresetProps, { as: "button" }>, "as">;

interface PlateContentProps {
  layout: "vertical" | "horizontal";
  image?: { src?: string; alt: string };
  caption?: string;
  title: string;
  body: ReactNode;
}

const PlateContent = ({ layout, image, caption, title, body }: PlateContentProps) => (
  <>
    {image && (
      <CardImage src={image.src} alt={image.alt} ratio={layout === "vertical" ? "3:4" : "1:1"} />
    )}
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
      <PlateContent layout={layout} {...contentProps} />
      <CardOverlay as='a' href={href} target={target} rel={rel} />
    </CardRoot>
  ),
);

PlateLink.displayName = "Card.Preset.Plate.Link";

export const PlateButton = forwardRef<HTMLDivElement, PlateButtonProps>(
  ({ layout = "vertical", isDisabled = false, onClick, type, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateContent layout={layout} {...contentProps} />
      <CardOverlay as='button' onClick={onClick} type={type || "button"} />
    </CardRoot>
  ),
);

PlateButton.displayName = "Card.Preset.Plate.Button";

export const Plate = {
  Link: PlateLink,
  Button: PlateButton,
};
