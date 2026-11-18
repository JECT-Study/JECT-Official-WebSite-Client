import type { SVGProps } from "react";
const SvgCaptions = (props: SVGProps<SVGSVGElement>) => (
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
      d='M11 14a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2zM17 14a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2zM9 10a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2zM17 10a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2z'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M19 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM5 6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgCaptions;
