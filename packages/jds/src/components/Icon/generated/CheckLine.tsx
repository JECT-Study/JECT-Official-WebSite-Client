import type { SVGProps } from "react";
const SvgCheckLine = (props: SVGProps<SVGSVGElement>) => (
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
      d="m10.004 15.18 9.192-9.193 1.415 1.414-10.607 10.607-6.364-6.364 1.414-1.414z"
    />
  </svg>
);
export default SvgCheckLine;
