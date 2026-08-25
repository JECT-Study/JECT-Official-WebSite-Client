import type { SVGProps } from "react";
const SvgCloud = (props: SVGProps<SVGSVGElement>) => (
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
      d='M6.053 4.562A8 8 0 0 1 16.416 9h1.083a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5h-8.5A8 8 0 0 1 6.053 4.562m3.994 1.53a6 6 0 0 0-7.023 5.381A6 6 0 0 0 8.999 18h8.5a3.5 3.5 0 0 0 0-7h-1.79a1 1 0 0 1-.958-.714 6 6 0 0 0-4.704-4.194'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgCloud;
