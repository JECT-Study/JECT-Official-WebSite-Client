import type { SVGProps } from "react";
const SvgMeh = (props: SVGProps<SVGSVGElement>) => (
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
      d='M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0m-5 2a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zM9.01 8a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2H15a1 1 0 1 1 0-2zM23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11'
    />
  </svg>
);
export default SvgMeh;
