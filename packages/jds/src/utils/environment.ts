import { Theme } from '@emotion/react';
import { Depth, DeviceType, Level, Shadow } from 'types';

export function depth(theme: Theme, depthToken: Depth): string {
  if (depthToken === 'shallowest') {
    return `
          background-color: ${theme.color.surface.shallowest}
        `;
  } else if (depthToken === 'shallower') {
    return `
          background-color: ${theme.color.surface.shallower}
        `;
  } else if (depthToken === 'shallow') {
    return `
          background-color: ${theme.color.surface.shallow}
        `;
  } else if (depthToken === 'standard') {
    return `
          background-color: ${theme.color.surface.standard}
        `;
  } else if (depthToken === 'deep') {
    return `
          background-color: ${theme.color.surface.deep}
        `;
  } else if (depthToken === 'deeper') {
    return `
          background-color: ${theme.color.surface.deeper}
        `;
  } else if (depthToken === 'deepest') {
    return `
          background-color: ${theme.color.surface.deepest}
        `;
  }

  return '';
}

export function level(theme: Theme, device: DeviceType, levelToken: Level): string {
  if (levelToken === 'standard') {
    return `
      z-index: auto;
    `;
  } else if (levelToken === 'embossed') {
    return `
      z-index: 100;
      ${shadow(theme, device, 'embossed')}
    `;
  } else if (levelToken === 'raised') {
    return `
      z-index: 200;
      ${shadow(theme, device, 'raised')}
    `;
  } else if (levelToken === 'floated') {
    return `
      z-index: 300;
      ${shadow(theme, device, 'floated')}
    `;
  } else if (levelToken === 'overlay') {
    return `
      z-index: 400;
      ${shadow(theme, device, 'overlay')}
    `;
  }

  return '';
}

export function shadow(theme: Theme, device: DeviceType, shadowToken: Shadow): string {
  if (shadowToken === 'embossed') {
    return `
        box-shadow: 0 0 ${theme.scheme[device].radius[2]}px 0 ${theme.colorPrimitive.primitive.shade[2]}, 0 ${theme.scheme[device].position[2]}px ${theme.scheme[device].radius[4]}px 0 ${theme.colorPrimitive.primitive.shade[4]};
    `;
  } else if (shadowToken === 'raised') {
    return `
        box-shadow: 0 0 ${theme.scheme[device].radius[2]}px 0 ${theme.colorPrimitive.primitive.shade[6]}, 0 ${theme.scheme[device].position[3]}px ${theme.scheme[device].radius[6]}px  0 ${theme.colorPrimitive.primitive.shade[12]};
    `;
  } else if (shadowToken === 'floated') {
    return `
        box-shadow: 0 0 ${theme.scheme[device].radius[2]}px 0 ${theme.colorPrimitive.primitive.shade[4]}, 0 ${theme.scheme[device].position[3]}px ${theme.scheme[device].radius[4]}px 0 ${theme.colorPrimitive.primitive.shade[8]}, 0 ${theme.scheme[device].position[4]}px ${theme.scheme[device].radius[8]}px 0 ${theme.colorPrimitive.primitive.shade[12]};
    `;
  } else if (shadowToken === 'overlay') {
    return `
        box-shadow: 0 0 ${theme.scheme[device].radius[4]}px 0 ${theme.colorPrimitive.primitive.shade[8]}, 0 ${theme.scheme[device].position[3]}px ${theme.scheme[device].radius[8]}px 0 ${theme.colorPrimitive.primitive.shade[12]}, 0 ${theme.scheme[device].position[8]}px ${theme.scheme[device].radius[16]}px 0 ${theme.colorPrimitive.primitive.shade[16]};
    `;
  }

  return '';
}
