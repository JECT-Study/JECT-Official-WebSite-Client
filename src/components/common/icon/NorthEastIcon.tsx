import { iconStyle } from '@/styles/iconStyle';
import { IconProps } from '@/types/icon';

function NorthEastIcon({ size, fillColor }: IconProps) {
  const iconSize = iconStyle.size[size];

  return (
    <svg
      className={`${fillColor}`}
      width={iconSize}
      height={iconSize}
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9.5 4.5V6.5H16.09L4.5 18.09L5.91 19.5L17.5 7.91V14.5H19.5V4.5H9.5Z' />
    </svg>
  );
}

export default NorthEastIcon;
