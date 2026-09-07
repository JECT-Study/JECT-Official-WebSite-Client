import type { SVGProps } from "react";
const SvgMoon = (props: SVGProps<SVGSVGElement>) => (
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
      d='M11.583 2a1.45 1.45 0 0 1 1.266.834c.216.45.215 1.022-.085 1.501l-.002-.001a5.002 5.002 0 0 0 6.892 6.89l.183-.099a1.57 1.57 0 0 1 1.316.012c.47.224.868.725.832 1.39A10.001 10.001 0 0 1 4.93 19.06a10 10 0 0 1 6.53-17.057zm-.96 2.107a8 8 0 0 0-6.094 5.02 8 8 0 0 0 13.938 7.57 8 8 0 0 0 1.412-3.333 6.998 6.998 0 0 1-9.256-9.257'
    />
  </svg>
);
export default SvgMoon;
