import type { Theme } from '@emotion/react';
import type { Depth, Level, Shadow } from 'types';

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

export function level(theme: Theme, levelToken: Level) {
  if (levelToken === 'standard') {
    return { zIndex: 'auto' as const };
  } else if (levelToken === 'embossed') {
    return {
      zIndex: 100,
      ...shadow(theme, 'embossed'),
    };
  } else if (levelToken === 'raised') {
    return {
      zIndex: 200,
      ...shadow(theme, 'raised'),
    };
  } else if (levelToken === 'floated') {
    return {
      zIndex: 300,
      ...shadow(theme, 'floated'),
    };
  } else if (levelToken === 'overlay') {
    return {
      zIndex: 400,
      ...shadow(theme, 'overlay'),
    };
  }

  return {};
}

export function shadow(theme: Theme, shadowToken: Shadow) {
  if (shadowToken === 'embossed') {
    return {
      boxShadow: `0 0 ${theme.scheme.semantic.radius[2]} 0 ${theme.colorPrimitive.primitive.shade[2]}, 
                  0 2px ${theme.scheme.semantic.radius[4]} 0 ${theme.colorPrimitive.primitive.shade[4]}`,
    };
  } else if (shadowToken === 'raised') {
    return {
      boxShadow: `0 0 ${theme.scheme.semantic.radius[2]} 0 ${theme.colorPrimitive.primitive.shade[6]}, 
                  0 3px ${theme.scheme.semantic.radius[6]} 0 ${theme.colorPrimitive.primitive.shade[12]}`,
    };
  } else if (shadowToken === 'floated') {
    return {
      boxShadow: `0 0 ${theme.scheme.semantic.radius[2]} 0 ${theme.colorPrimitive.primitive.shade[4]}, 
                  0 3px ${theme.scheme.semantic.radius[4]} 0 ${theme.colorPrimitive.primitive.shade[8]}, 
                  0 4px ${theme.scheme.semantic.radius[8]} 0 ${theme.colorPrimitive.primitive.shade[12]}`,
    };
  } else if (shadowToken === 'overlay') {
    return {
      boxShadow: `0 0 ${theme.scheme.semantic.radius[4]} 0 ${theme.colorPrimitive.primitive.shade[8]},
                  0 3px ${theme.scheme.semantic.radius[8]} 0 ${theme.colorPrimitive.primitive.shade[12]},
                  0 8px ${theme.scheme.semantic.radius[16]} 0 ${theme.colorPrimitive.primitive.shade[16]}`,
    };
  }

  return {};
}
