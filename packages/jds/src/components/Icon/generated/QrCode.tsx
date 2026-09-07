import type { SVGProps } from "react";
const SvgQrCode = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 21.005v-.01a1 1 0 1 1 2 0v.01a1 1 0 1 1-2 0m-16-4.01v3h3v-3zm7 4v-1a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0m4 0v-3a3 3 0 0 1 3-3h3a1 1 0 1 1 0 2h-3a1 1 0 0 0-1 1v3a1 1 0 1 1-2 0m-4-4.99v-.01a1 1 0 1 1 2 0v.01a1 1 0 1 1-2 0m9-4v-.01a1 1 0 1 1 2 0v.01a1 1 0 1 1-2 0m-16.99-1.01a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2zm7.99-1v-3a1 1 0 1 1 2 0v3a3 3 0 0 1-3 3H7a1 1 0 1 1 0-2h3a1 1 0 0 0 1-1m6 1a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2zm-13-7v3h3v-3zm13 0v3h3v-3zm-4.99-2a1 1 0 1 1 0 2H12a1 1 0 1 1 0-2zm-3.01 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2zm0-13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2zm13 0a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2z'
    />
  </svg>
);
export default SvgQrCode;
