import type { SVGProps } from 'react';
const SvgLinkLine = (props: SVGProps<SVGSVGElement>) => (
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
      d='m17.657 14.836-1.414-1.415 1.414-1.414A4 4 0 1 0 12 6.35l-1.414 1.415L9.172 6.35l1.414-1.414a6 6 0 0 1 8.485 8.485zm-2.829 2.828-1.414 1.414a6 6 0 0 1-8.485-8.485l1.414-1.414 1.414 1.414-1.414 1.414A4 4 0 0 0 12 17.664l1.414-1.414zm0-9.9 1.415 1.415-7.071 7.07-1.415-1.413z'
    />
  </svg>
);
export default SvgLinkLine;
