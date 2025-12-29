import type { SVGProps } from "react";
const SvgCursorLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='m15.387 13.502 2.553 7.014-4.698 1.71-2.553-7.014-3.899 2.445 1.619-16.02L19.946 12.87zm-.01 5.818-2.715-7.46 2.96-.41-5.64-5.49-.791 7.83 2.531-1.587 2.715 7.46z'
    />
  </svg>
);
export default SvgCursorLine;
