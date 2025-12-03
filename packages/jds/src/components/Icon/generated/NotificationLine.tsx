import type { SVGProps } from "react";
const SvgNotificationLine = (props: SVGProps<SVGSVGElement>) => (
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
      d="M22 20.007H2v-2h1V11.04c0-4.988 4.03-9.032 9-9.032s9 4.044 9 9.032v6.968h1zm-17-2h14V11.04c0-3.884-3.134-7.032-7-7.032S5 7.155 5 11.04zm4.5 3h5a2.5 2.5 0 0 1-5 0"
    />
  </svg>
);
export default SvgNotificationLine;
