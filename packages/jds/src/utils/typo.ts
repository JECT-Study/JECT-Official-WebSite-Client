import { Theme } from '@emotion/react';
import { em, lh, rem } from './cssUnit';
import { DeviceType, TextStyle } from 'types';

export function typo(theme: Theme, device: DeviceType, typoToken: TextStyle): string {
  const [_, element, ...rest] = typoToken.split('.');

  if (element === 'hero' || element === 'title') {
    const scale = Number(rest[0]);
    const fontSize = theme.typo[device].font.size[element][scale];

    if (scale === 3 || scale === 4) {
      return `
            font-family: ${theme.typo[device].typeface[element]};
            font-size: ${rem(fontSize)};
            font-style: normal;
            font-weight: ${theme.typo[device].font.weight[element].bold};
            line-height: ${lh(fontSize, theme.typo[device].font.line.height[element][scale])};
            letter-spacing: ${em(fontSize, theme.typo[device].font.letter.spacing[element][scale])};
        `;
    }

    return `
            font-family: ${theme.typo[device].typeface[element]};
            font-size: ${rem(fontSize)};
            font-style: normal;
            font-weight: ${theme.typo[device].font.weight[element].normal};
            line-height: ${lh(fontSize, theme.typo[device].font.line.height[element][scale])};
            letter-spacing: ${em(fontSize, theme.typo[device].font.letter.spacing[element][scale])};
    `;
  } else if (element === 'label' || element === 'body') {
    const [scale, modifier] = rest;
    const fontSize = theme.typo[device].font.size[element][scale];

    return `
            font-family: ${theme.typo[device].typeface[element]};
            font-size: ${rem(fontSize)};
            font-style: normal;
            font-weight: ${theme.typo[device].font.weight[element][modifier]};
            line-height: ${lh(fontSize, theme.typo[device].font.line.height[element][scale])};
            letter-spacing: ${em(fontSize, theme.typo[device].font.letter.spacing[element][scale])};
    `;
  } else if (element === 'syntax') {
    const modifier = rest[0];
    const fontSize = theme.typo[device].font.size[element][modifier];

    return `
        font-family: ${theme.typo[device].typeface[element]};
        font-size: ${rem(fontSize)};
        font-style: normal;
        font-weight: ${theme.typo[device].font.weight[element].normal};
        line-height: ${lh(fontSize, theme.typo[device].font.line.height[element][modifier])};
    `;
  }

  console.error('올바른 토큰이 아닙니다', typoToken);
  return '';
}
