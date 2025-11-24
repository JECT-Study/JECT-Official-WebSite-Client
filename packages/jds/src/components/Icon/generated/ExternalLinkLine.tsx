import type { SVGProps } from "react";
const SvgExternalLinkLine = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10 6.007v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1zm11-3v8h-2V6.42l-7.793 7.794L9.793 12.8l7.792-7.793H13v-2z"
    />
  </svg>
);
export default SvgExternalLinkLine;
