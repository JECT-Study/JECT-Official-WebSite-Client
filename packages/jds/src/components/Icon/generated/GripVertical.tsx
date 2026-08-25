import type { SVGProps } from "react";
const SvgGripVertical = (props: SVGProps<SVGSVGElement>) => (
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
      d='M9 17a2 2 0 1 1 0 4 2 2 0 0 1 0-4M15 17a2 2 0 1 1 0 4 2 2 0 0 1 0-4M9 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4M15 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4M9 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4M15 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4'
    />
  </svg>
);
export default SvgGripVertical;
