import type { SVGProps } from 'react';
const SvgFrame = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 25'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M9 7.014h6v-3h2v3h3v2h-3v6h3v2h-3v3h-2v-3H9v3H7v-3H4v-2h3v-6H4v-2h3v-3h2zm0 2v6h6v-6z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgFrame;
