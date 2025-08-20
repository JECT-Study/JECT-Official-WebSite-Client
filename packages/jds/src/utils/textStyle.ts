import { Theme } from '@emotion/react';
import { pxToRem, spacingToEm, lineHeightRatio } from './cssUnit';
import {
  BodyModifierKey,
  BodyScaleKey,
  DeviceType,
  HeroScaleKey,
  LabelModifierKey,
  LabelScaleKey,
  SyntaxScaleKey,
  TextStyle,
} from 'types';

export function textStyle(theme: Theme, device: DeviceType, typoToken: TextStyle): string {
  const [element, ...rest] = typoToken.split('.');

  if (element === 'hero' || element === 'title') {
    const scale = rest[0] as HeroScaleKey;
    const fontSize = theme.typo[device].font.size[element][scale];

    if (scale === '3' || scale === '4') {
      return `
            font-family: ${theme.typo[device].typeface[element]};
            font-size: ${pxToRem(fontSize)};
            font-style: normal;
            font-weight: ${theme.typo[device].font.weight[element].bold};
            line-height: ${lineHeightRatio(theme.typo[device].font.line.height[element][scale], fontSize, 2)};
            letter-spacing: ${spacingToEm(theme.typo[device].font.letter.spacing[element][scale], fontSize)};
        `;
    }

    return `
            font-family: ${theme.typo[device].typeface[element]};
            font-size: ${pxToRem(fontSize)};
            font-style: normal;
            font-weight: ${theme.typo[device].font.weight[element].normal};
            line-height: ${lineHeightRatio(theme.typo[device].font.line.height[element][scale], fontSize, 2)};
            letter-spacing: ${spacingToEm(theme.typo[device].font.letter.spacing[element][scale], fontSize)};
    `;
  } else if (element === 'label') {
    const [scale, modifier] = rest as [LabelScaleKey, LabelModifierKey];
    const fontSize = theme.typo[device].font.size[element][scale];

    return `
            font-family: ${theme.typo[device].typeface[element]};
            font-size: ${pxToRem(fontSize)};
            font-style: normal;
            font-weight: ${theme.typo[device].font.weight[element][modifier]};
            line-height: ${lineHeightRatio(theme.typo[device].font.line.height[element][scale], fontSize)};
            letter-spacing: ${spacingToEm(theme.typo[device].font.letter.spacing[element][scale], fontSize)};
    `;
  } else if (element === 'body') {
    const [scale, modifier] = rest as [BodyScaleKey, BodyModifierKey];
    const fontSize = theme.typo[device].font.size[element][scale];

    return `
            font-family: ${theme.typo[device].typeface[element]};
            font-size: ${pxToRem(fontSize)};
            font-style: normal;
            font-weight: ${theme.typo[device].font.weight[element][modifier]};
            line-height: ${lineHeightRatio(theme.typo[device].font.line.height[element][scale], fontSize)};
            letter-spacing: ${spacingToEm(theme.typo[device].font.letter.spacing[element][scale], fontSize)};
    `;
  } else if (element === 'syntax') {
    const scale = rest[0] as SyntaxScaleKey;
    const fontSize = theme.typo[device].font.size[element][scale];

    return `
        font-family: ${theme.typo[device].typeface[element]};
        font-size: ${pxToRem(fontSize)};
        font-style: normal;
        font-weight: ${theme.typo[device].font.weight[element].normal};
        line-height: ${lineHeightRatio(theme.typo[device].font.line.height[element][scale], fontSize)};
    `;
  }

  return '';
}
