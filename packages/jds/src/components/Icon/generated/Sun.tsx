import type { SVGProps } from "react";
const SvgSun = (props: SVGProps<SVGSVGElement>) => (
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
      d='M11 22v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0m-5.367-5.047a1 1 0 1 1 1.414 1.414l-1.41 1.41a1 1 0 0 1-1.414-1.414zm11.32 0a1 1 0 0 1 1.414 0l1.41 1.41a1 1 0 0 1-1.414 1.414l-1.41-1.41a1 1 0 0 1 0-1.414M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0M4 11a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2zm18 0a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2zM4.223 4.223a1 1 0 0 1 1.414 0l1.41 1.41a1 1 0 1 1-1.414 1.414l-1.41-1.41a1 1 0 0 1 0-1.414m14.14 0a1 1 0 0 1 1.414 1.414l-1.41 1.41a1 1 0 1 1-1.414-1.414zM11 4V2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0m6 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0'
    />
  </svg>
);
export default SvgSun;
