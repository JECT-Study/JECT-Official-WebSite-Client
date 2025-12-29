import type { SVGProps } from "react";
const SvgEyeLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 3.007c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9s-9.878-3.88-10.819-9c.94-5.12 5.427-9 10.82-9m0 16a9.005 9.005 0 0 0 8.778-7 9.005 9.005 0 0 0-17.555 0 9.005 9.005 0 0 0 8.777 7m0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9m0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5'
    />
  </svg>
);
export default SvgEyeLine;
