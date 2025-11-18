import { forwardRef } from 'react';

import type { PlateWithTitlePresetProps } from '../Card.types';
import { CardRoot, CardImage, CardContent, CardCaption, CardTitle, CardBody } from '../compound';

/**
 * @description
 * Title을 포함한 Plate 카드의 프리셋입니다.
 * 이미지(선택), 캡션(선택), 제목(필수), 본문(필수)으로 구성됩니다.
 *
 */
export const PlateWithTitle = forwardRef<HTMLDivElement, PlateWithTitlePresetProps>(
  ({ layout = 'vertical', isDisabled = false, image, caption, title, body, ...restProps }, ref) => {
    return (
      <CardRoot ref={ref} layout={layout} variant='plate' isDisabled={isDisabled} {...restProps}>
        {image && <CardImage src={image.src} alt={image.alt} />}
        <CardContent>
          {caption && <CardCaption>{caption}</CardCaption>}
          <CardTitle>{title}</CardTitle>
          <CardBody>{body}</CardBody>
        </CardContent>
      </CardRoot>
    );
  },
);

PlateWithTitle.displayName = 'Card.Preset.PlateWithTitle';
