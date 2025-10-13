import { IconProps } from './Icon.types';
import { iconMap, sizeMap } from './IconMap';

export const Icon = ({ name, size = 'md', color }: IconProps) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  const pixelSize = sizeMap[size];
  const BaseColor = color ?? 'currentColor';

  return <IconComponent width={pixelSize} height={pixelSize} color={BaseColor} />;
};
