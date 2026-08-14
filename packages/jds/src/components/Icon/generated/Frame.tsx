import type { SVGProps } from "react";
const SvgFrame = (props: SVGProps<SVGSVGElement>) => (
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
      d='M17 22v-3H7v3a1 1 0 1 1-2 0v-3H2a1 1 0 1 1 0-2h3V7H2a1 1 0 0 1 0-2h3V2a1 1 0 0 1 2 0v3h10V2a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v10h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0M7 17h10V7H7z'
    />
  </svg>
);
export default SvgFrame;
