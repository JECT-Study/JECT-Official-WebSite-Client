import type { ElementType } from 'react';

import type { PlateCompactPresetProps } from '../Card.types';
import { CardRoot, CardImage, CardContent, CardCaption, CardBody } from '../compound';

import { PolymorphicForwardRef } from '@/utils/forwardRef';

export const PlateCompact = PolymorphicForwardRef<'div', PlateCompactPresetProps>(
  ({ as, layout = 'vertical', isDisabled = false, image, caption, body, ...restProps }, ref) => {
    const Component = as || ('div' as ElementType);

    return (
      <Component ref={ref} {...restProps}>
        <CardRoot layout={layout} variant='plate' isDisabled={isDisabled}>
          {image && <CardImage src={image.src} alt={image.alt} />}
          <CardContent>
            <CardCaption>{caption}</CardCaption>
            <CardBody>{body}</CardBody>
          </CardContent>
        </CardRoot>
      </Component>
    );
  },
);

PlateCompact.displayName = 'Card.Preset.PlateCompact';
