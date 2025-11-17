import type { Theme } from '@emotion/react';
import type { Depth, DeviceType, Level, Shadow } from 'types';

export function depth(theme: Theme, depthToken: Depth) {
  if (depthToken === 'shallowest') {
    return { backgroundColor: theme.color.semantic.surface.shallowest };
  } else if (depthToken === 'shallower') {
    return { backgroundColor: theme.color.semantic.surface.shallower };
  } else if (depthToken === 'shallow') {
    return { backgroundColor: theme.color.semantic.surface.shallow };
  } else if (depthToken === 'standard') {
    return { backgroundColor: theme.color.semantic.surface.standard };
  } else if (depthToken === 'deep') {
    return { backgroundColor: theme.color.semantic.surface.deep };
  } else if (depthToken === 'deeper') {
    return { backgroundColor: theme.color.semantic.surface.deeper };
  } else if (depthToken === 'deepest') {
    return { backgroundColor: theme.color.semantic.surface.deepest };
  }

  return {};
}

export function level(theme: Theme, device: DeviceType, levelToken: Level) {
  if (levelToken === 'standard') {
    return { zIndex: 'auto' as const };
  } else if (levelToken === 'embossed') {
    return {
      zIndex: 100,
      ...shadow(theme, device, 'embossed'),
    };
  } else if (levelToken === 'raised') {
    return {
      zIndex: 200,
      ...shadow(theme, device, 'raised'),
    };
  } else if (levelToken === 'floated') {
    return {
      zIndex: 300,
      ...shadow(theme, device, 'floated'),
    };
  } else if (levelToken === 'overlay') {
    return {
      zIndex: 400,
      ...shadow(theme, device, 'overlay'),
    };
  }

  return {};
}

export function shadow(theme: Theme, device: DeviceType, shadowToken: Shadow) {
  if (shadowToken === 'embossed') {
    return {
      boxShadow: `0 0 ${theme.scheme[device].radius[2]}px 0 ${theme.colorPrimitive.primitive.shade[2]}, 
                  0 ${theme.scheme[device].position[2]}px ${theme.scheme[device].radius[4]}px 0 ${theme.colorPrimitive.primitive.shade[4]}`,
    };
  } else if (shadowToken === 'raised') {
    return {
      boxShadow: `0 0 ${theme.scheme[device].radius[2]}px 0 ${theme.colorPrimitive.primitive.shade[6]}, 
                  0 ${theme.scheme[device].position[3]}px ${theme.scheme[device].radius[6]}px 0 ${theme.colorPrimitive.primitive.shade[12]}`,
    };
  } else if (shadowToken === 'floated') {
    return {
      boxShadow: `0 0 ${theme.scheme[device].radius[2]}px 0 ${theme.colorPrimitive.primitive.shade[4]}, 
                  0 ${theme.scheme[device].position[3]}px ${theme.scheme[device].radius[4]}px 0 ${theme.colorPrimitive.primitive.shade[8]}, 
                  0 ${theme.scheme[device].position[4]}px ${theme.scheme[device].radius[8]}px 0 ${theme.colorPrimitive.primitive.shade[12]}`,
    };
  } else if (shadowToken === 'overlay') {
    return {
      boxShadow: `0 0 ${theme.scheme[device].radius[4]}px 0 ${theme.colorPrimitive.primitive.shade[8]}, 
                  0 ${theme.scheme[device].position[3]}px ${theme.scheme[device].radius[8]}px 0 ${theme.colorPrimitive.primitive.shade[12]}, 
                  0 ${theme.scheme[device].position[8]}px ${theme.scheme[device].radius[16]}px 0 ${theme.colorPrimitive.primitive.shade[16]}`,
    };
  }

  return {};
}
