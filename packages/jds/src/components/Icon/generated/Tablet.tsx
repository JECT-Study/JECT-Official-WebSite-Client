import type { SVGProps } from "react";
const SvgTablet = (props: SVGProps<SVGSVGElement>) => (
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
      d='M19 4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zm-6.99 13a1 1 0 1 1 0 2H12a1 1 0 1 1 0-2zM21 20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3z'
    />
  </svg>
);
export default SvgTablet;
