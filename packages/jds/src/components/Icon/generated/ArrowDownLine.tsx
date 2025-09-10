import type { SVGProps } from 'react';
const SvgArrowDownLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='m12.998 16.175 5.364-5.364 1.414 1.414-7.778 7.779-7.778-7.779 1.414-1.414 5.364 5.364V4.004h2z'
    />
  </svg>
);
export default SvgArrowDownLine;
