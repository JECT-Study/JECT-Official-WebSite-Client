import type { SVGProps } from "react";
const SvgTriangleAlert = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12.019 16.014a1 1 0 0 1 0 2h-.011a1 1 0 0 1 0-2zM12.008 8.014a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M11.998 2a3 3 0 0 1 2.609 1.518l7.998 13.996.092.174a3.003 3.003 0 0 1-2.688 4.326H4.008A3 3 0 0 1 .99 19.02a3 3 0 0 1 .4-1.502l8-14A3 3 0 0 1 11.998 2m0 2a1 1 0 0 0-.87.507l-.001.003-8 14-.003.004a1.002 1.002 0 0 0 .875 1.5h16.008a1 1 0 0 0 .865-.5 1 1 0 0 0 0-1l-.002-.004-8-14-.002-.003a1 1 0 0 0-.87-.507'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgTriangleAlert;
