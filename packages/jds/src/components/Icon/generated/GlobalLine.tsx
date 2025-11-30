import type { SVGProps } from "react";
const SvgGlobalLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 22.007c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10m-2.29-2.332a17.9 17.9 0 0 1-1.683-6.668H4.062a8.01 8.01 0 0 0 5.648 6.668m.32-6.668c.151 2.439.848 4.73 1.97 6.752a15.9 15.9 0 0 0 1.97-6.752zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.668 8.01 8.01 0 0 0 5.648-6.668m-15.876-2h3.965A17.9 17.9 0 0 1 9.71 4.34a8.01 8.01 0 0 0-5.648 6.667m5.969 0h3.938A15.9 15.9 0 0 0 12 4.255a15.9 15.9 0 0 0-1.97 6.752M14.29 4.34a17.9 17.9 0 0 1 1.683 6.667h3.965A8.01 8.01 0 0 0 14.29 4.34'
    />
  </svg>
);
export default SvgGlobalLine;
