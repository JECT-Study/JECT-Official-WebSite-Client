import type { SVGProps } from "react";
const SvgQrCodeLine = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16 17.007v-1h-3v-3h3v2h2v2h-1v2h-2v2h-2v-3h2v-1zm5 4h-4v-2h2v-2h2zm-18-18h8v8H3zm2 2v4h4v-4zm8-2h8v8h-8zm2 2v4h4v-4zm-12 8h8v8H3zm2 2v4h4v-4zm13-2h3v2h-3zm-12-7h2v2H6zm0 10h2v2H6zm10-10h2v2h-2z"
    />
  </svg>
);
export default SvgQrCodeLine;
