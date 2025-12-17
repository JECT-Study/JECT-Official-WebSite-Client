import { forwardRef, type ReactNode } from "react";

import type { PlateCompactPresetProps } from "../Card.types";
import { CardRoot, CardImage, CardContent, CardCaption, CardBody } from "../compound";
import { StyledCardOverlay } from "../compound/compound.styles";

type PlateCompactLinkProps = Omit<Extract<PlateCompactPresetProps, { as: "a" }>, "as">;
type PlateCompactButtonProps = Omit<Extract<PlateCompactPresetProps, { as: "button" }>, "as">;

interface PlateCompactContentProps {
  layout: "vertical" | "horizontal";
  image?: { src?: string; alt: string };
  caption: string;
  body: ReactNode;
}

const PlateCompactContent = ({
  layout,
  image,
  caption,
  body,
}: PlateCompactContentProps) => (
  <>
    {image && (
      <CardImage src={image.src} alt={image.alt} ratio={layout === 'vertical' ? '1:2' : '1:1'} />
    )}
    <CardContent>
      <CardBody>{body}</CardBody>
      <CardCaption>{caption}</CardCaption>
    </CardContent>
  </>
);

export const PlateCompactLink = forwardRef<HTMLDivElement, PlateCompactLinkProps>(
  ({ layout = "vertical", isDisabled = false, href, target, rel, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateCompactContent layout={layout} {...contentProps} />
      <StyledCardOverlay
        as='a'
        href={href}
        target={target}
        rel={rel}
        data-overlay
        $variant='plate'
        $isDisabled={isDisabled}
      />
    </CardRoot>
  ),
);

PlateCompactLink.displayName = "Card.Preset.PlateCompact.Link";

export const PlateCompactButton = forwardRef<HTMLDivElement, PlateCompactButtonProps>(
  ({ layout = "vertical", isDisabled = false, onClick, type, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateCompactContent layout={layout} {...contentProps} />
      <StyledCardOverlay
        as='button'
        onClick={onClick}
        type={type || "button"}
        data-overlay
        $variant='plate'
        $isDisabled={isDisabled}
      />
    </CardRoot>
  ),
);

PlateCompactButton.displayName = "Card.Preset.PlateCompact.Button";

export const PlateCompact = {
  Link: PlateCompactLink,
  Button: PlateCompactButton,
};
