import type { SVGProps } from "react";
const SvgVectorSquare = (props: SVGProps<SVGSVGElement>) => (
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
      d='M6 1a2 2 0 0 1 2 2v.296c2.65-.43 5.35-.43 8 0V3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-.297c.43 2.65.43 5.35 0 8H21a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-.297c-2.65.43-5.35.43-8 0V21a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h.297c-.43-2.65-.43-5.35 0-8H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 21h3v-3H3zm15 0h3v-3h-3zM16 5.325a23 23 0 0 0-8 0V6a2 2 0 0 1-2 2h-.675a23 23 0 0 0 0 8H6a2 2 0 0 1 2 2v.674c2.646.467 5.354.467 8 0V18a2 2 0 0 1 2-2h.675a23 23 0 0 0 0-8H18a2 2 0 0 1-2-2zM3 6h3V3H3zm15 0h3V3h-3z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgVectorSquare;
