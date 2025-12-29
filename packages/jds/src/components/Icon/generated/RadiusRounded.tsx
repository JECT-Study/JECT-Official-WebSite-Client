import type { SVGProps } from "react";
const SvgRadiusRounded = (props: SVGProps<SVGSVGElement>) => (
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
      d='M5 21H3v-2h2zM5 17H3v-2h2zM5 13H3v-2h2zM5 9H3V7h2zM5 5H3V3h2zM9 5H7V3h2zM21 21h-2v-2h2zM21 17h-2v-2h2zM9 21H7v-2h2zM13 21h-2v-2h2zM17 21h-2v-2h2zM20.995 7.783A5 5 0 0 0 16 3h-5v2h5l.176.005A3.01 3.01 0 0 1 19 8v5h2V8z'
    />
  </svg>
);
export default SvgRadiusRounded;
