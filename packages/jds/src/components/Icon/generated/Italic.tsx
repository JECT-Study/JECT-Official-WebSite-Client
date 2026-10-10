import type { SVGProps } from "react";
const SvgItalic = (props: SVGProps<SVGSVGElement>) => (
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
      d='M19 3a1 1 0 1 1 0 2h-3.307l-5.25 14H14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2h3.307l5.25-14H10a1 1 0 0 1 0-2z'
    />
  </svg>
);
export default SvgItalic;
