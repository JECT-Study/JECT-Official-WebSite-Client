import type { SVGProps } from "react";
const SvgAtLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 12.007a8 8 0 1 0-3.562 6.657l1.11 1.665A9.95 9.95 0 0 1 12 22.007c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10v1.5a3.5 3.5 0 0 1-6.396 1.966A5 5 0 1 1 15 8.007H17v5.5a1.5 1.5 0 0 0 3 0zm-8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6'
    />
  </svg>
);
export default SvgAtLine;
