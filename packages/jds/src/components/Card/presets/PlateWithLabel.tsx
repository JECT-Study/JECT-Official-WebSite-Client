import type { ElementType } from 'react';

import type { PlateWithLabelPresetProps } from '../Card.types';
import { CardRoot, CardImage, CardContent, CardCaption, CardLabel, CardBody } from '../compound';

import { PolymorphicForwardRef } from '@/utils/forwardRef';

export const PlateWithLabel = PolymorphicForwardRef<'div', PlateWithLabelPresetProps>(
  (
    { as, layout = 'vertical', isDisabled = false, image, caption, label, body, ...restProps },
    ref,
  ) => {
    const Component = as || ('div' as ElementType);

    return (
      <Component ref={ref} {...restProps}>
        <CardRoot layout={layout} variant='plate' isDisabled={isDisabled}>
          {image && <CardImage src={image.src} alt={image.alt} />}
          <CardContent>
            {caption && <CardCaption>{caption}</CardCaption>}
            <CardLabel>{label}</CardLabel>
            <CardBody>{body}</CardBody>
          </CardContent>
        </CardRoot>
      </Component>
    );
  },
);

PlateWithLabel.displayName = 'Card.Preset.PlateWithLabel';
