import type { SVGProps } from "react";
const SvgFile = (props: SVGProps<SVGSVGElement>) => (
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
      d='M14 1a3.4 3.4 0 0 1 2.411.999l3.586 3.586.116.121A3.4 3.4 0 0 1 21 8v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3zM6 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9h-4a2 2 0 0 1-2-2V3zm9 4h3.584L15 3.416z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgFile;
