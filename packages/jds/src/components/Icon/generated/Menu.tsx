import type { SVGProps } from "react";
const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 18a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zM20 11a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zM20 4a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z'
    />
  </svg>
);
export default SvgMenu;
