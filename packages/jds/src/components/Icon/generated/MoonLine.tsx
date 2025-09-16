import type { SVGProps } from 'react';
const SvgMoonLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='M10 7.007a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10h.1a6.98 6.98 0 0 0-2.1 5m-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.945 8 8 0 0 0 4 12.007'
    />
  </svg>
);
export default SvgMoonLine;
