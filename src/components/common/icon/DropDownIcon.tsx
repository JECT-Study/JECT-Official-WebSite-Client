import { iconStyle } from '@/styles/iconStyle';
import { IconProps } from '@/types/icon';

function DropDownIcon({ size, fillColor }: IconProps) {
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
      <path d='M7 9.5L12 14.5L17 9.5H7Z' />
    </svg>
  );
}

export default DropDownIcon;
