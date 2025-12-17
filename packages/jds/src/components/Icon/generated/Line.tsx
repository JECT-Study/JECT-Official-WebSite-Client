import type { SVGProps } from "react";
const SvgLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 25'
    {...props}
  >
    <path fill='currentColor' d='M19.083 3.514 20.5 4.931 4.917 20.514 3.5 19.098z' />
  </svg>
);
export default SvgLine;
