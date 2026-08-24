import type { SVGProps } from "react";
const SvgType = (props: SVGProps<SVGSVGElement>) => (
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
      d='M19 3a2 2 0 0 1 2 2v2a1 1 0 1 1-2 0V5h-6v14h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2V5H5v2a1 1 0 0 1-2 0V5a2 2 0 0 1 2-2z'
    />
  </svg>
);
export default SvgType;
