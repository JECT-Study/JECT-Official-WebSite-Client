import type { SVGProps } from "react";
const SvgMailLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='M3 3.007h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1m17 4.238-7.928 7.1L4 7.223v11.784h16zM4.511 5.007l7.55 6.662 7.44-6.662z'
    />
  </svg>
);
export default SvgMailLine;
