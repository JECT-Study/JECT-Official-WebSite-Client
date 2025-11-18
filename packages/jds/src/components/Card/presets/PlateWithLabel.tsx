import { forwardRef } from 'react';

import type { PlateWithLabelPresetProps } from '../Card.types';
import { CardRoot, CardImage, CardContent, CardCaption, CardLabel, CardBody } from '../compound';

/**
 * @description
 * Label을 포함한 Plate 카드의 프리셋입니다.
 * 이미지(선택), 캡션(선택), 라벨(필수), 본문(필수)으로 구성됩니다.
 *
 */
export const PlateWithLabel = forwardRef<HTMLDivElement, PlateWithLabelPresetProps>(
  ({ layout = 'vertical', isDisabled = false, image, caption, label, body, ...restProps }, ref) => {
    return (
      <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} {...restProps}>
        {image && <CardImage src={image.src} alt={image.alt} />}
        <CardContent>
          {caption && <CardCaption>{caption}</CardCaption>}
          <CardLabel>{label}</CardLabel>
          <CardBody>{body}</CardBody>
        </CardContent>
      </CardRoot>
    );
  },
);

PlateWithLabel.displayName = 'Card.Preset.PlateWithLabel';
