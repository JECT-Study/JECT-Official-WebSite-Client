import type { SVGProps } from "react";
const SvgStrikethrough = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 11a1 1 0 1 1 0 2h-2.001A4.998 4.998 0 0 1 14 21H6a1 1 0 1 1 0-2h8a3 3 0 0 0 0-6H4a1 1 0 1 1 0-2zM16 3a1 1 0 0 1 0 2H8.999a2 2 0 0 0-1.982 1.725c-.044.317-.011.64.095.942a1 1 0 1 1-1.885.666A4 4 0 0 1 9 3z'
    />
  </svg>
);
export default SvgStrikethrough;
