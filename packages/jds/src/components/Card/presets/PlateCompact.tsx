import { forwardRef, type ReactNode } from 'react';

import type { PlateCompactPresetProps } from '../Card.types';
import { CardRoot, CardImage, CardContent, CardCaption, CardBody } from '../compound';
import { StyledCardOverlay } from '../compound/compound.styles';

type PlateCompactLinkProps = Omit<Extract<PlateCompactPresetProps, { as: 'a' }>, 'as'>;
type PlateCompactButtonProps = Omit<Extract<PlateCompactPresetProps, { as: 'button' }>, 'as'>;

interface PlateCompactContentProps {
  image?: { src: string; alt: string };
  caption: string;
  body: ReactNode;
}

const PlateCompactContent = ({ image, caption, body }: PlateCompactContentProps) => (
  <>
    {image && <CardImage src={image.src} alt={image.alt} />}
    <CardContent>
      <CardCaption>{caption}</CardCaption>
      <CardBody>{body}</CardBody>
    </CardContent>
  </>
);

export const PlateCompactLink = forwardRef<HTMLDivElement, PlateCompactLinkProps>(
  ({ layout = 'vertical', isDisabled = false, href, target, rel, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateCompactContent {...contentProps} />
      <StyledCardOverlay as='a' href={href} target={target} rel={rel} data-overlay />
    </CardRoot>
  ),
);

PlateCompactLink.displayName = 'Card.Preset.PlateCompact.Link';

export const PlateCompactButton = forwardRef<HTMLDivElement, PlateCompactButtonProps>(
  ({ layout = 'vertical', isDisabled = false, onClick, type, ...contentProps }, ref) => (
    <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} interactive>
      <PlateCompactContent {...contentProps} />
      <StyledCardOverlay as='button' onClick={onClick} type={type || 'button'} data-overlay />
    </CardRoot>
  ),
);

PlateCompactButton.displayName = 'Card.Preset.PlateCompact.Button';

export const PlateCompact = {
  Link: PlateCompactLink,
  Button: PlateCompactButton,
};
