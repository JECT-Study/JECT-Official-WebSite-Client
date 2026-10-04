import type { SVGProps } from "react";
const SvgHeading4 = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0v-5H5v5a1 1 0 1 1-2 0V6a1 1 0 0 1 2 0v5h6V6a1 1 0 0 1 1-1M21 9a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0v-3h-2a2 2 0 0 1-2-2v-3a1 1 0 1 1 2 0v3h2v-3a1 1 0 0 1 1-1'
    />
  </svg>
);
export default SvgHeading4;
