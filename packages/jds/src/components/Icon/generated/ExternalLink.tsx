import type { SVGProps } from "react";
const SvgExternalLink = (props: SVGProps<SVGSVGElement>) => (
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
      d='M11 5a1 1 0 1 1 0 2H5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-6a1 1 0 1 1 2 0v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z'
    />
    <path
      fill='currentColor'
      d='M21 2a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V5.414l-9.293 9.293a1 1 0 1 1-1.414-1.414L18.586 4H15a1 1 0 1 1 0-2z'
    />
  </svg>
);
export default SvgExternalLink;
