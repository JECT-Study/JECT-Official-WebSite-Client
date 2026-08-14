import type { SVGProps } from "react";
const SvgSquareDashed = (props: SVGProps<SVGSVGElement>) => (
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
      d='M3 18a1 1 0 0 1 1 1 1 1 0 0 0 1 1 1 1 0 1 1 0 2 3 3 0 0 1-3-3 1 1 0 0 1 1-1M10 20a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2zM15 20a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2zM21 18a1 1 0 0 1 1 1 3 3 0 0 1-3 3 1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 0 1 1-1M3 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1M21 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1M3 8a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1M21 8a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1M5 2a1 1 0 0 1 0 2 1 1 0 0 0-1 1 1 1 0 0 1-2 0 3 3 0 0 1 3-3M19 2a3 3 0 0 1 3 3 1 1 0 1 1-2 0 1 1 0 0 0-1-1 1 1 0 1 1 0-2M10 2a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2zM15 2a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2z'
    />
  </svg>
);
export default SvgSquareDashed;
