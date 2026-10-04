import type { SVGProps } from "react";
const SvgUnderline = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 19a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zM18 3a1 1 0 0 1 1 1v6a7.001 7.001 0 1 1-14 0V4a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V4a1 1 0 0 1 1-1'
    />
  </svg>
);
export default SvgUnderline;
