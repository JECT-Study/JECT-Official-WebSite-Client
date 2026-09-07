import type { SVGProps } from "react";
const SvgSquareSlash = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1zm-5.707 3.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 1 1-1.414-1.414zM22 19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3z'
    />
  </svg>
);
export default SvgSquareSlash;
