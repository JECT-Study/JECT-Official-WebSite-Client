import type { SVGProps } from "react";
const SvgBold = (props: SVGProps<SVGSVGElement>) => (
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
      d='M14 3a5 5 0 0 1 3.535 8.535q-.05.05-.103.098A4.998 4.998 0 0 1 15 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM7 19h8a3 3 0 0 0 0-6H7zm0-8h7a3 3 0 0 0 0-6H7z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgBold;
