import type { SVGProps } from "react";
const SvgCloudFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17 7.007a8 8 0 0 0-7.493 5.19l1.874.703A6.002 6.002 0 0 1 23 15.007a6 6 0 0 1-6 6H7A6 6 0 0 1 5.008 9.346a7 7 0 0 1 13.757-2.143A8 8 0 0 0 17 7.007"
    />
  </svg>
);
export default SvgCloudFill;
