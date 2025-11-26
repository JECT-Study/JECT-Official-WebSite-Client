import type { SVGProps } from "react";
const SvgMailFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3 3.007h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1m9.06 8.683L5.648 6.245 4.353 7.769l7.72 6.555 7.581-6.56-1.308-1.513z"
    />
  </svg>
);
export default SvgMailFill;
