import type { SVGProps } from "react";
const SvgVector = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 25"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7.83 20.014A3.001 3.001 0 1 1 4 16.184v-8.34a3.001 3.001 0 1 1 3.83-3.83h8.34A3.001 3.001 0 1 1 20 7.844v8.34a3.001 3.001 0 1 1-3.83 3.83zm0-2h8.34a3 3 0 0 1 1.83-1.83v-8.34a3 3 0 0 1-1.83-1.83H7.83A3 3 0 0 1 6 7.844v8.34a3 3 0 0 1 1.83 1.83M5 6.014a1 1 0 1 0 0-2 1 1 0 0 0 0 2m14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
    />
  </svg>
);
export default SvgVector;
