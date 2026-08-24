import type { SVGProps } from "react";
const SvgFolder = (props: SVGProps<SVGSVGElement>) => (
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
      d='M7.93 2.5a3 3 0 0 1 2.505 1.35l.804 1.19.006.01a1 1 0 0 0 .845.45H20a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-13a3 3 0 0 1 3-3zM4 4.5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-10a1 1 0 0 0-1-1h-7.9A3 3 0 0 1 9.58 6.16l-.81-1.2-.006-.01a1 1 0 0 0-.835-.45z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgFolder;
