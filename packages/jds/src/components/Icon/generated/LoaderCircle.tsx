import type { SVGProps } from "react";
const SvgLoaderCircle = (props: SVGProps<SVGSVGElement>) => (
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
      d='M21 11a1 1 0 0 1 1 1.001 10 10 0 1 1-6.91-9.512 1 1 0 1 1-.618 1.903 8.001 8.001 0 0 0-4.945 15.216A8.002 8.002 0 0 0 20 12a1 1 0 0 1 1-1'
    />
  </svg>
);
export default SvgLoaderCircle;
