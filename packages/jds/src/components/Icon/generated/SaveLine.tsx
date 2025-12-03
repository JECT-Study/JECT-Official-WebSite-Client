import type { SVGProps } from "react";
const SvgSaveLine = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7 19.007v-6h10v6h2V7.836l-2.828-2.829H5v14zm-3-16h13l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1m5 12v4h6v-4z"
    />
  </svg>
);
export default SvgSaveLine;
