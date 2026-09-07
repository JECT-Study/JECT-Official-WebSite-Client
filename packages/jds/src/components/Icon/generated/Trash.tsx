import type { SVGProps } from "react";
const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
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
      fillRule='evenodd'
      d='M14 1a3 3 0 0 1 3 3v1h4a1 1 0 1 1 0 2h-1v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7H3a1 1 0 0 1 0-2h4V4a3 3 0 0 1 3-3zM6 20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7H6zm4-17a1 1 0 0 0-1 1v1h6V4a1 1 0 0 0-1-1z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgTrash;
