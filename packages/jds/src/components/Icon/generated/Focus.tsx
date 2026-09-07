import type { SVGProps } from "react";
const SvgFocus = (props: SVGProps<SVGSVGElement>) => (
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
      d='M3 16a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1M21 16a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3h-2a1 1 0 1 1 0-2h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      d='M7 2a1 1 0 0 1 0 2H5a1 1 0 0 0-1 1v2a1 1 0 0 1-2 0V5a3 3 0 0 1 3-3zM19 2a3 3 0 0 1 3 3v2a1 1 0 1 1-2 0V5a1 1 0 0 0-1-1h-2a1 1 0 1 1 0-2z'
    />
  </svg>
);
export default SvgFocus;
