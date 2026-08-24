import type { SVGProps } from "react";
const SvgSquareRoundCorner = (props: SVGProps<SVGSVGElement>) => (
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
      d='M2 19V5a3 3 0 0 1 3-3h4a1 1 0 0 1 0 2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 1 1 2 0v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3m18-8a7 7 0 0 0-7-7 1 1 0 1 1 0-2 9 9 0 0 1 9 9 1 1 0 1 1-2 0'
    />
  </svg>
);
export default SvgSquareRoundCorner;
