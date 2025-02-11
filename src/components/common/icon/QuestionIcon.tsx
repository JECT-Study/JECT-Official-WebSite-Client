import { iconStyle } from '@/styles/iconStyle';
import { IconProps } from '@/types/icon';

function QuestionIcon({ size, fillColor }: IconProps) {
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
      <path d='M11.0688 12.35C11.8388 10.96 13.3188 10.14 14.1788 8.91C15.0888 7.62 14.5788 5.21 11.9988 5.21C10.3088 5.21 9.47882 6.49 9.12882 7.55L6.53882 6.46C7.24882 4.33 9.17882 2.5 11.9888 2.5C14.3388 2.5 15.9488 3.57 16.7688 4.91C17.4688 6.06 17.8788 8.21 16.7988 9.81C15.5988 11.58 14.4488 12.12 13.8288 13.26C13.5788 13.72 13.4788 14.02 13.4788 15.5H10.5888C10.5788 14.72 10.4588 13.45 11.0688 12.35ZM13.9988 19.5C13.9988 20.6 13.0988 21.5 11.9988 21.5C10.8988 21.5 9.99882 20.6 9.99882 19.5C9.99882 18.4 10.8988 17.5 11.9988 17.5C13.0988 17.5 13.9988 18.4 13.9988 19.5Z' />
    </svg>
  );
}

export default QuestionIcon;
