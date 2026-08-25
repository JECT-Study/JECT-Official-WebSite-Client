import type { SVGProps } from "react";
const SvgTableOfContents = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M15.995 18a1 1 0 1 1 0 2h-13a1 1 0 1 1 0-2zM21.005 18a1 1 0 1 1 0 2h-.01a1 1 0 1 1 0-2zM15.995 11a1 1 0 1 1 0 2h-13a1 1 0 1 1 0-2zM21.005 11a1 1 0 1 1 0 2h-.01a1 1 0 1 1 0-2zM15.995 4a1 1 0 1 1 0 2h-13a1 1 0 1 1 0-2zM21.005 4a1 1 0 1 1 0 2h-.01a1 1 0 1 1 0-2z'
    />
  </svg>
);
export default SvgTableOfContents;
