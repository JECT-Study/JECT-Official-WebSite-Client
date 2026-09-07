import type { SVGProps } from "react";
const SvgSlash = (props: SVGProps<SVGSVGElement>) => (
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
      d='M21.293 1.293a1 1 0 1 1 1.414 1.414l-20 20a1 1 0 1 1-1.414-1.414z'
    />
  </svg>
);
export default SvgSlash;
