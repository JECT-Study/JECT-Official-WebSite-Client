import type { SVGProps } from "react";
const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
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
      d='M21 14a1 1 0 0 1 1 1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-4a1 1 0 1 1 2 0v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1'
    />
    <path
      fill='currentColor'
      d='M12 2a1 1 0 0 1 1 1v9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L11 12.586V3a1 1 0 0 1 1-1'
    />
  </svg>
);
export default SvgDownload;
