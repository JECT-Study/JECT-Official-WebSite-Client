import type { SVGProps } from "react";
const SvgHouse = (props: SVGProps<SVGSVGElement>) => (
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
      d='M10 13.001V20h4v-6.999zM22 19a3 3 0 0 1-3 3h-3.982l-.018.001-.018-.001H9.018L9 22.001 8.982 22H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 1.063-2.291l6.996-5.996.005-.004a3 3 0 0 1 3.663-.162l.21.162.004.004 6.995 5.996.123.108A3 3 0 0 1 22 10zm-6 1h3a1 1 0 0 0 1-1v-9a1 1 0 0 0-.355-.764l-.004-.005-6.995-5.996a1 1 0 0 0-1.292.001L4.359 9.23l-.005.005A1 1 0 0 0 4 10v9a1 1 0 0 0 1 1h3v-6.999a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z'
    />
  </svg>
);
export default SvgHouse;
