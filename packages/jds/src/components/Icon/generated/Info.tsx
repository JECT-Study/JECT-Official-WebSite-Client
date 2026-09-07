import type { SVGProps } from "react";
const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
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
      d='M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0m-10 4v-4a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0m1.01-9a1 1 0 1 1 0 2H12a1 1 0 1 1 0-2zM23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11'
    />
  </svg>
);
export default SvgInfo;
