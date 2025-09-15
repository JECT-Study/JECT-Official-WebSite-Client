import type { SVGProps } from 'react';
const SvgAsterisk = (props: SVGProps<SVGSVGElement>) => (
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
      d='M13 3.007v7.267l6.294-3.633 1 1.732-6.293 3.633 6.293 3.635-1 1.732L13 13.74v7.268h-2V13.74l-6.294 3.634-1-1.732 6.293-3.634-6.293-3.634 1-1.732L11 10.274V3.007z'
    />
  </svg>
);
export default SvgAsterisk;
