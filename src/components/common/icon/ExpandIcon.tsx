import { iconStyle } from '@/styles/iconStyle';
import { IconProps } from '@/types/icon';

function ExpandIcon({ size, fillColor }: IconProps) {
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
      <path d='M16.59 8.295L12 12.875L7.41 8.295L6 9.705L12 15.705L18 9.705L16.59 8.295Z' />
    </svg>
  );
}

export default ExpandIcon;
