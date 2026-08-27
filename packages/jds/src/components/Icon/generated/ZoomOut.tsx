import type { SVGProps } from "react";
const SvgZoomOut = (props: SVGProps<SVGSVGElement>) => (
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
      d='M18 11a7 7 0 1 0-2.137 5.032 1 1 0 0 1 .17-.169A6.98 6.98 0 0 0 18 11m-4-1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm6 1a8.96 8.96 0 0 1-1.97 5.615l3.677 3.678a1 1 0 1 1-1.414 1.414l-3.677-3.677A9 9 0 1 1 20 11'
    />
  </svg>
);
export default SvgZoomOut;
