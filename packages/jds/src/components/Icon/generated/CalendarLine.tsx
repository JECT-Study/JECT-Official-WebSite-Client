import type { SVGProps } from 'react';
const SvgCalendarLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 25 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M9.192 1.007v2h6v-2h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1h4v-2zm11 10h-16v8h16zm-12 2v2h-2v-2zm5 0v2h-2v-2zm5 0v2h-2v-2zm-11-8h-3v4h16v-4h-3v2h-2v-2h-6v2h-2z'
    />
  </svg>
);
export default SvgCalendarLine;
