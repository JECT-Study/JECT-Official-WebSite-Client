import type { SVGProps } from "react";
const SvgTabletLine = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6 4.007v16h12v-16zm-1-2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-18a1 1 0 0 1 1-1m7 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
    />
  </svg>
);
export default SvgTabletLine;
