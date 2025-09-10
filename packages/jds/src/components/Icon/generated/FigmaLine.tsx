import type { SVGProps } from 'react';
const SvgFigmaLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='M5 6.007a4 4 0 0 1 4-4h6a4 4 0 0 1 2.646 7A4 4 0 0 1 13 15.472v2.535a4 4 0 1 1-6.646-3 4 4 0 0 1-1.354-3 4 4 0 0 1 1.354-3 4 4 0 0 1-1.354-3m6 4H9a2 2 0 1 0 0 4h2zm2 2a2 2 0 1 0 4 0 2 2 0 0 0-4 0m2-4a2 2 0 1 0 0-4h-2v4zm-6-4a2 2 0 1 0 0 4h2v-4zm2 12H9a2 2 0 1 0 2 2z'
    />
  </svg>
);
export default SvgFigmaLine;
