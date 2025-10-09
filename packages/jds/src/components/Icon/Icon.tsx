import type { IconProps } from './Icon.types';
import { iconMap, sizeMap } from './IconMap';

export const Icon = ({ name, size = 'md', color = 'currentColor', ...props }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) return null;

  const pixelSize = sizeMap[size];

  return (
    <IconComponent width={pixelSize} height={pixelSize} color={color} {...props} />
  );
};
