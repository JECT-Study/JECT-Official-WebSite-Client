import { iconStyle } from '@/styles/iconStyle';
import { IconProps } from '@/types/icon';

function LessIcon({ size, fillColor }: IconProps) {
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
      <path d='M12 8.295L6 14.295L7.41 15.705L12 11.125L16.59 15.705L18 14.295L12 8.295Z' />
    </svg>
  );
}

export default LessIcon;
