import type { SVGProps } from "react";
const SvgArrowDownRight = (props: SVGProps<SVGSVGElement>) => (
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
      d='M17 6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7a1 1 0 1 1 0-2h7.586L6.293 7.707a1 1 0 1 1 1.414-1.414L16 14.586V7a1 1 0 0 1 1-1'
    />
  </svg>
);
export default SvgArrowDownRight;
