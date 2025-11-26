import type { SVGProps } from "react";
const SvgFlagFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3 3.007h9.382a1 1 0 0 1 .894.553L14 5.007h6a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-6.382a1 1 0 0 1-.894-.553L12 16.007H5v6H3z"
    />
  </svg>
);
export default SvgFlagFill;
