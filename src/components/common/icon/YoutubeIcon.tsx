import { iconStyle } from '@/styles/iconStyle';
import { IconProps } from '@/types/icon';

function YoutubeIcon({ size, fillColor }: IconProps) {
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
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M20.9356 6.02842C21.2459 6.34073 21.4687 6.72906 21.5818 7.15454C22 8.725 22 12 22 12C22 12 22 15.275 21.5818 16.8455C21.4687 17.2709 21.2459 17.6593 20.9356 17.9716C20.6253 18.2839 20.2384 18.5092 19.8136 18.625C18.25 19.0455 12 19.0455 12 19.0455C12 19.0455 5.75 19.0455 4.18636 18.625C3.76161 18.5092 3.37472 18.2839 3.06441 17.9716C2.7541 17.6593 2.53125 17.2709 2.41818 16.8455C2 15.275 2 12 2 12C2 12 2 8.725 2.41818 7.15454C2.53125 6.72906 2.7541 6.34073 3.06441 6.02842C3.37472 5.71612 3.76161 5.49079 4.18636 5.375C5.75 4.95454 12 4.95454 12 4.95454C12 4.95454 18.25 4.95454 19.8136 5.375C20.2384 5.49079 20.6253 5.71612 20.9356 6.02842ZM15.1818 12L9.95456 9.02616V14.9739L15.1818 12Z'
      />
    </svg>
  );
}

export default YoutubeIcon;
