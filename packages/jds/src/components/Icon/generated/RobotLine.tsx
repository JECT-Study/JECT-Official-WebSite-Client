import type { SVGProps } from "react";
const SvgRobotLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#robot-line_svg__a)">
      <path
        fill="currentColor"
        d="M13.5 2.007c0 .444-.193.844-.5 1.118v1.882h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-10a3 3 0 0 1 3-3h5V3.125a1.5 1.5 0 1 1 2.5-1.118m-7.5 5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-10a1 1 0 0 0-1-1H6m-4 3H0v6h2zm20 0h2v6h-2zm-13 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
      />
    </g>
    <defs>
      <clipPath id="robot-line_svg__a">
        <path fill="#fff" d="M0 .007h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgRobotLine;
