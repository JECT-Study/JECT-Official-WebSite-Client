import type { SVGProps } from "react";
const SvgArrowRightLine = (props: SVGProps<SVGSVGElement>) => (
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
      d="m16.172 10.975-5.364-5.517 1.414-1.454 7.778 8-7.778 8-1.414-1.455 5.364-5.517H4v-2.057z"
    />
  </svg>
);
export default SvgArrowRightLine;
