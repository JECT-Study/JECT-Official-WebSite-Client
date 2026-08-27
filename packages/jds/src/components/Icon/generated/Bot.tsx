import type { SVGProps } from "react";
const SvgBot = (props: SVGProps<SVGSVGElement>) => (
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
      d='M19 10a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM8 15v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0m6 0v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0m7-2h1a1 1 0 1 1 0 2h-1v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3H2a1 1 0 1 1 0-2h1v-3a3 3 0 0 1 3-3h5V5H8a1 1 0 0 1 0-2h4a1 1 0 0 1 1 1v3h5a3 3 0 0 1 3 3z'
    />
  </svg>
);
export default SvgBot;
