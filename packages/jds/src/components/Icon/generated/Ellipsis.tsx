import type { SVGProps } from "react";
const SvgEllipsis = (props: SVGProps<SVGSVGElement>) => (
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
      d='M5 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4M19 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4'
    />
  </svg>
);
export default SvgEllipsis;
