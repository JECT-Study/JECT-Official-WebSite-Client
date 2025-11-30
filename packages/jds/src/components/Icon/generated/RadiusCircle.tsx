import type { SVGProps } from "react";
const SvgRadiusCircle = (props: SVGProps<SVGSVGElement>) => (
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
      d='M5 21H3v-2h2zM5 17H3v-2h2zM5 13H3v-2h2zM5 9H3V7h2zM5 5H3V3h2zM9 5H7V3h2zM21 21h-2v-2h2zM21 17h-2v-2h2zM9 21H7v-2h2zM13 21h-2v-2h2zM17 21h-2v-2h2zM12 3a9 9 0 0 1 9 9v1h-2v-1a7 7 0 0 0-7-7h-1V3z'
    />
  </svg>
);
export default SvgRadiusCircle;
