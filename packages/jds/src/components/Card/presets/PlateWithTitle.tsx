import type { ElementType } from 'react';

import type { PlateWithTitlePresetProps } from '../Card.types';
import { CardRoot, CardImage, CardContent, CardCaption, CardTitle, CardBody } from '../compound';

import { PolymorphicForwardRef } from '@/utils/forwardRef';

export const PlateWithTitle = PolymorphicForwardRef<'div', PlateWithTitlePresetProps>(
  (
    { as, layout = 'vertical', isDisabled = false, image, caption, title, body, ...restProps },
    ref,
  ) => {
    const Component = as || ('div' as ElementType);

    return (
      <Component ref={ref} {...restProps}>
        <CardRoot layout={layout} variant='plate' isDisabled={isDisabled}>
          {image && <CardImage src={image.src} alt={image.alt} />}
          <CardContent>
            {caption && <CardCaption>{caption}</CardCaption>}
            <CardTitle>{title}</CardTitle>
            <CardBody>{body}</CardBody>
          </CardContent>
        </CardRoot>
      </Component>
    );
  },
);

PlateWithTitle.displayName = 'Card.Preset.PlateWithTitle';
