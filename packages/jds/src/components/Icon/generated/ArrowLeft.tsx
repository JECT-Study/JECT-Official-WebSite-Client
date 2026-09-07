import type { SVGProps } from "react";
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d='M11.293 4.293a1 1 0 1 1 1.414 1.414L7.414 11H19a1 1 0 0 1 0 2H7.414l5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414z'
    />
  </svg>
);
export default SvgArrowLeft;
