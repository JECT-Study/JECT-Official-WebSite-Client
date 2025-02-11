import { iconStyle } from '@/styles/iconStyle';
import { IconProps } from '@/types/icon';

function CheckIcon({ size, fillColor }: IconProps) {
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
      <path d='M8.79496 15.875L4.62496 11.705L3.20496 13.115L8.79496 18.705L20.795 6.705L19.385 5.295L8.79496 15.875Z' />
    </svg>
  );
}
export default CheckIcon;
