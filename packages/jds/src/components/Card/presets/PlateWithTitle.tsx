import { forwardRef, type ReactNode } from "react";

import type { PlateWithTitlePresetProps } from "../Card.types";
import { CardRoot, CardImage, CardContent, CardCaption, CardTitle, CardBody } from "../compound";
import { StyledCardOverlay } from "../compound/compound.styles";

type PlateWithTitleLinkProps = Omit<Extract<PlateWithTitlePresetProps, { as: "a" }>, "as">;
type PlateWithTitleButtonProps = Omit<Extract<PlateWithTitlePresetProps, { as: "button" }>, "as">;

interface PlateWithTitleContentProps {
  layout: "vertical" | "horizontal";
  image?: { src?: string; alt: string };
  caption?: string;
  title: string;
  body: ReactNode;
}

const PlateWithTitleContent = ({
  layout,
  image,
  caption,
  title,
  body,
}: PlateWithTitleContentProps) => (
  <>
    {image && (
      <CardImage src={image.src} alt={image.alt} ratio={layout === 'vertical' ? '2:3' : '1:1'} />
    )}
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardBody>{body}</CardBody>
      {caption && <CardCaption>{caption}</CardCaption>}
    </CardContent>
  </>
);

export const PlateWithTitleLink = forwardRef<HTMLDivElement, PlateWithTitleLinkProps>(
  ({ layout = "vertical", isDisabled = false, href, target, rel, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateWithTitleContent layout={layout} {...contentProps} />
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

PlateWithTitleLink.displayName = "Card.Preset.PlateWithTitle.Link";

export const PlateWithTitleButton = forwardRef<HTMLDivElement, PlateWithTitleButtonProps>(
  ({ layout = "vertical", isDisabled = false, onClick, type, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateWithTitleContent layout={layout} {...contentProps} />
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

PlateWithTitleButton.displayName = "Card.Preset.PlateWithTitle.Button";

export const PlateWithTitle = {
  Link: PlateWithTitleLink,
  Button: PlateWithTitleButton,
};
