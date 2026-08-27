import type { SVGProps } from "react";
const SvgArrowDownLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d='M16.293 6.293a1 1 0 1 1 1.414 1.414L9.414 16H17a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v7.586z'
    />
  </svg>
);
export default SvgArrowDownLeft;
