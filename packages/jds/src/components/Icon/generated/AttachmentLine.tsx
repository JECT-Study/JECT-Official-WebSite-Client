import type { SVGProps } from "react";
const SvgAttachmentLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='M14 13.507v-5.5a4 4 0 0 0-8 0v5.5a6.5 6.5 0 1 0 13 0v-9.5h2v9.5a8.5 8.5 0 0 1-17 0v-5.5a6 6 0 1 1 12 0v5.5a3.5 3.5 0 1 1-7 0v-5.5h2v5.5a1.5 1.5 0 0 0 3 0'
    />
  </svg>
);
export default SvgAttachmentLine;
