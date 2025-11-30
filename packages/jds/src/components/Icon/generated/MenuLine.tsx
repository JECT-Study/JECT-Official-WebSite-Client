import type { SVGProps } from "react";
const SvgMenuLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 24'
    {...props}
  >
    <path fill='currentColor' d='M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z' />
  </svg>
);
export default SvgMenuLine;
