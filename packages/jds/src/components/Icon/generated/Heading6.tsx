import type { SVGProps } from "react";
const SvgHeading6 = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0v-5H5v5a1 1 0 1 1-2 0V6a1 1 0 0 1 2 0v5h6V6a1 1 0 0 1 1-1'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M19.293 9.293a1 1 0 1 1 1.414 1.414c-.868.868-1.49 1.588-1.918 2.3q.105-.006.211-.007a3 3 0 1 1-2.996 2.84c.02-1.328.302-2.445.863-3.498.571-1.07 1.406-2.029 2.426-3.049M19 15a1 1 0 1 0 0 2 1 1 0 0 0 0-2'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgHeading6;
