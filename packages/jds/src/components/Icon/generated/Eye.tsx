import type { SVGProps } from "react";
const SvgEye = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 4a11.75 11.75 0 0 1 10.69 6.87l.173.401.013.033a2 2 0 0 1 0 1.392l-.013.033a11.751 11.751 0 0 1-21.726 0l-.012-.033a2 2 0 0 1 0-1.392l.012-.033a11.75 11.75 0 0 1 10.864-7.27m0 2a9.75 9.75 0 0 0-9 6 9.75 9.75 0 0 0 14.424 4.352A9.75 9.75 0 0 0 20.999 12 9.75 9.75 0 0 0 12 6m2 6A2 2 0 1 0 10 12 2 2 0 0 0 14 12m2 0a4 4 0 1 1-8-.001 4 4 0 0 1 8 0'
    />
  </svg>
);
export default SvgEye;
