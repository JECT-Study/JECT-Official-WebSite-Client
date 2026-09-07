import type { SVGProps } from "react";
const SvgCoins = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M5.974 9.3a1 1 0 0 1 .579 1.913 5.003 5.003 0 0 0-3.372 6.12 5 5 0 0 0 9.605.114 1 1 0 0 1 1.915.579 7 7 0 1 1-8.727-8.727'
    />
    <path
      fill='currentColor'
      d='M6.59 13.356a1 1 0 0 1 1.276.412l2 3.465a1 1 0 0 1-1.733 1l-1.5-2.599a1 1 0 0 1-1-1.731l.866-.5zM16 5a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V7a1 1 0 0 1 0-2z'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M16 1a7 7 0 1 1-.001 14 7 7 0 0 1 0-14m0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgCoins;
