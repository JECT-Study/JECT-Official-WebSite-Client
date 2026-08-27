import type { SVGProps } from "react";
const SvgRoute = (props: SVGProps<SVGSVGElement>) => (
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
      d='M18 1a4 4 0 1 1-3.874 5H6.5a2.5 2.5 0 0 0 0 5h11a4.5 4.5 0 0 1 0 9H9.874A4.002 4.002 0 0 1 2 19a4 4 0 0 1 7.874-1H17.5a2.5 2.5 0 0 0 0-5h-11a4.5 4.5 0 0 1 0-9h7.626c.444-1.725 2.01-3 3.874-3M6 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4M18 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgRoute;
