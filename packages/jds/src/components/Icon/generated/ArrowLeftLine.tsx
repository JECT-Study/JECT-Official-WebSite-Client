import type { SVGProps } from 'react';
const SvgArrowLeftLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='M7.828 10.975H20v2.057H7.828l5.364 5.517-1.414 1.455-7.778-8 7.778-8 1.414 1.454z'
    />
  </svg>
);
export default SvgArrowLeftLine;
