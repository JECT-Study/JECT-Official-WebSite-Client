import { iconStyle } from '@/styles/iconStyle';
import { IconProps } from '@/types/icon';

function FileIcon({ size, fillColor }: IconProps) {
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
      <path d='M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM6 20V4H13V9H18V20H6Z' />
    </svg>
  );
}

export default FileIcon;
