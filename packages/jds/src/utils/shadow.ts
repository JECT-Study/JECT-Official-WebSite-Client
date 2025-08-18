import { Theme } from '@emotion/react';
import { Shadow } from 'types';

export function shadow(theme: Theme, shadowToken: Shadow) {
  if (shadowToken === 'embossed') {
    return `
        box-shadow: 0 0 ${theme.scheme.desktop.radius[2]}px 0 ${theme.colorPrimitive.primitive.shade[2]}, 0 ${theme.scheme.desktop.position[2]}px ${theme.scheme.desktop.radius[4]}px 0 ${theme.colorPrimitive.primitive.shade[4]};
    `;
  } else if (shadowToken === 'raised') {
    return `
        box-shadow: 0 0 ${theme.scheme.desktop.radius[2]}px 0 ${theme.colorPrimitive.primitive.shade[6]}, 0 ${theme.scheme.desktop.position[3]}px ${theme.scheme.desktop.radius[6]}px  0 ${theme.colorPrimitive.primitive.shade[12]};
    `;
  } else if (shadowToken === 'floated') {
    return `
        box-shadow: 0 0 ${theme.scheme.desktop.radius[2]}px 0 ${theme.colorPrimitive.primitive.shade[4]}, 0 ${theme.scheme.desktop.position[3]}px ${theme.scheme.desktop.radius[4]}px 0 ${theme.colorPrimitive.primitive.shade[8]}, 0 ${theme.scheme.desktop.position[4]}px ${theme.scheme.desktop.radius[8]}px 0 ${theme.colorPrimitive.primitive.shade[12]};
    `;
  } else if (shadowToken === 'overlay') {
    return `
        box-shadow: 0 0 ${theme.scheme.desktop.radius[4]}px 0 ${theme.colorPrimitive.primitive.shade[8]}, 0 ${theme.scheme.desktop.position[3]}px ${theme.scheme.desktop.radius[8]}px 0 ${theme.colorPrimitive.primitive.shade[12]}, 0 ${theme.scheme.desktop.position[8]}px ${theme.scheme.desktop.radius[16]}px 0 ${theme.colorPrimitive.primitive.shade[16]};
    `;
  }
}
