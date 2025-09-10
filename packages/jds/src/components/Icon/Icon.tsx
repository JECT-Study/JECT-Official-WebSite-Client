import { useTheme } from 'theme';
import { IconProps } from './Icon.types';
import { iconMap, sizeMap } from './IconMap';

export const Icon = ({ name, size = 'md', color }: IconProps) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  const pixelSize = sizeMap[size];
  const theme = useTheme();
  const BaseColor = color ?? theme.color.object.boldest;

  return <IconComponent width={pixelSize} height={pixelSize} style={{ color: BaseColor }} />;
};
