import type { SVGProps } from "react";
const SvgMail = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM3 18a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.822l-7.454 4.748-.034.022a3 3 0 0 1-3.05-.022L3 8.821zM4 5a1 1 0 0 0-1 1v.45l8.508 5.415a1 1 0 0 0 .992 0L21 6.45V6a1 1 0 0 0-1-1z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgMail;
