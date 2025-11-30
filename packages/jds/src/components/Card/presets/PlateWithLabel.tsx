import { forwardRef, type ReactNode } from "react";

import type { PlateWithLabelPresetProps } from "../Card.types";
import { CardRoot, CardImage, CardContent, CardCaption, CardLabel, CardBody } from "../compound";
import { StyledCardOverlay } from "../compound/compound.styles";

type PlateWithLabelLinkProps = Omit<Extract<PlateWithLabelPresetProps, { as: "a" }>, "as">;
type PlateWithLabelButtonProps = Omit<Extract<PlateWithLabelPresetProps, { as: "button" }>, "as">;

interface PlateWithLabelContentProps {
  layout: "vertical" | "horizontal";
  image?: { src?: string; alt: string };
  caption?: string;
  label: string;
  body: ReactNode;
}

const PlateWithLabelContent = ({
  layout,
  image,
  caption,
  label,
  body,
}: PlateWithLabelContentProps) => (
  <>
    {image && (
      <CardImage src={image.src} alt={image.alt} ratio={layout === 'vertical' ? '2:3' : '1:1'} />
    )}
    <CardContent>
      <CardLabel>{label}</CardLabel>
      <CardBody>{body}</CardBody>
      {caption && <CardCaption>{caption}</CardCaption>}
    </CardContent>
  </>
);

export const PlateWithLabelLink = forwardRef<HTMLDivElement, PlateWithLabelLinkProps>(
  ({ layout = "vertical", isDisabled = false, href, target, rel, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateWithLabelContent layout={layout} {...contentProps} />
      <StyledCardOverlay
        as='a'
        href={href}
        target={target}
        rel={rel}
        data-overlay
        $variant='plate'
      />
    </CardRoot>
  ),
);

PlateWithLabelLink.displayName = "Card.Preset.PlateWithLabel.Link";

export const PlateWithLabelButton = forwardRef<HTMLDivElement, PlateWithLabelButtonProps>(
  ({ layout = "vertical", isDisabled = false, onClick, type, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateWithLabelContent layout={layout} {...contentProps} />
      <StyledCardOverlay
        as='button'
        onClick={onClick}
        type={type || "button"}
        data-overlay
        $variant='plate'
      />
    </CardRoot>
  ),
);

PlateWithLabelButton.displayName = "Card.Preset.PlateWithLabel.Button";

export const PlateWithLabel = {
  Link: PlateWithLabelLink,
  Button: PlateWithLabelButton,
};
