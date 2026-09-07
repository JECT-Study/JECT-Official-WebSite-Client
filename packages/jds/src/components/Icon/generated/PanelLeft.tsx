import type { SVGProps } from "react";
const SvgPanelLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d='M19 2a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3V4zm5 16h9a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgPanelLeft;
