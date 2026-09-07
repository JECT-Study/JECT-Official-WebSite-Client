import type { SVGProps } from "react";
const SvgUpload = (props: SVGProps<SVGSVGElement>) => (
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
      d='M21 14a1 1 0 0 1 1 1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-4a1 1 0 1 1 2 0v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1'
    />
    <path
      fill='currentColor'
      d='M11.37 2.225a1 1 0 0 1 1.337.068l5 5a1 1 0 0 1-1.414 1.414L13 5.414V15a1 1 0 0 1-2 0V5.414L7.707 8.707a1 1 0 0 1-1.414-1.414l5-5z'
    />
  </svg>
);
export default SvgUpload;
