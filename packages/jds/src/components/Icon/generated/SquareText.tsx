import type { SVGProps } from "react";
const SvgSquareText = (props: SVGProps<SVGSVGElement>) => (
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
      d='M13 15a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2zM17 11a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2zM15 7a1 1 0 1 1 0 2H7a1 1 0 0 1 0-2z'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M19 2a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgSquareText;
