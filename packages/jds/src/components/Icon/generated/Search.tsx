import type { SVGProps } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
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
      fillRule='evenodd'
      d='M11 2a9 9 0 0 1 7.03 14.616l3.677 3.677a1 1 0 1 1-1.414 1.414l-3.677-3.677A9 9 0 1 1 11 2m0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgSearch;
