import type { SVGProps } from "react";
const SvgEllipsisVertical = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 17a2 2 0 1 1 0 4 2 2 0 0 1 0-4M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4'
    />
  </svg>
);
export default SvgEllipsisVertical;
