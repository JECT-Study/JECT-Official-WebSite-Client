import type { SVGProps } from "react";
const SvgArrowUpRight = (props: SVGProps<SVGSVGElement>) => (
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
      d='M17 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V9.414l-8.293 8.293a1 1 0 1 1-1.414-1.414L14.586 8H7a1 1 0 0 1 0-2z'
    />
  </svg>
);
export default SvgArrowUpRight;
