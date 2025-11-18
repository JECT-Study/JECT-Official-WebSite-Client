import { forwardRef } from 'react';

import type { PlateCompactPresetProps } from '../Card.types';
import { CardRoot, CardImage, CardContent, CardCaption, CardBody } from '../compound';

/**
 * @description
 * Title과 Label이 존재하지 않는(Caption만 존재) Plate 카드의 프리셋입니다.
 * 이미지(선택), 캡션(필수), 본문(필수)으로 구성됩니다.
 * Title이나 Label 없이 간결하게 표시할 때 사용합니다.
 *
 */
export const PlateCompact = forwardRef<HTMLDivElement, PlateCompactPresetProps>(
  ({ layout = 'vertical', isDisabled = false, image, caption, body, ...restProps }, ref) => {
    return (
      <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} {...restProps}>
        {image && <CardImage src={image.src} alt={image.alt} />}
        <CardContent>
          <CardCaption>{caption}</CardCaption>
          <CardBody>{body}</CardBody>
        </CardContent>
      </CardRoot>
    );
  },
);

PlateCompact.displayName = 'Card.Preset.PlateCompact';
