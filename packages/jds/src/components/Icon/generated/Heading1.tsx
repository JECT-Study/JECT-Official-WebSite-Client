import type { SVGProps } from "react";
const SvgHeading1 = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0v-5H5v5a1 1 0 1 1-2 0V6a1 1 0 0 1 2 0v5h6V6a1 1 0 0 1 1-1M19.445 9.168A1 1 0 0 1 21 10v8a1 1 0 1 1-2 0v-6.132l-1.445.964a1 1 0 1 1-1.11-1.664z'
    />
  </svg>
);
export default SvgHeading1;
