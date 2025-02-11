import { iconStyle } from '@/styles/iconStyle';
import { IconProps } from '@/types/icon';

function UploadIcon({ size, fillColor }: IconProps) {
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
      <path d='M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM7 9L8.41 10.41L11 7.83V16H13V7.83L15.59 10.41L17 9L12 4L7 9Z' />
    </svg>
  );
}

export default UploadIcon;
