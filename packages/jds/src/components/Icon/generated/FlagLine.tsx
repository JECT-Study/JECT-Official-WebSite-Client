import type { SVGProps } from "react";
const SvgFlagLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12.382 3.007a1 1 0 0 1 .894.553L14 5.007h6a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-6.382a1 1 0 0 1-.894-.553L12 16.007H5v6H3v-19zm-.618 2H5v9h8.236l1 2H19v-9h-6.236z'
    />
  </svg>
);
export default SvgFlagLine;
