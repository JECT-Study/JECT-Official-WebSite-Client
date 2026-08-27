import type { SVGProps } from "react";
const SvgLaugh = (props: SVGProps<SVGSVGElement>) => (
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
      d='M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0m-3 0a1 1 0 0 1 .986 1.167 7 7 0 0 1-6.973 5.832V19L12 18.999l-.014.001a7 7 0 0 1-6.972-5.833A1 1 0 0 1 6 12zM7.335 14a5 5 0 0 0 4.679 3 4.998 4.998 0 0 0 4.651-3zM9.01 8a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2H15a1 1 0 1 1 0-2zM23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11'
    />
  </svg>
);
export default SvgLaugh;
