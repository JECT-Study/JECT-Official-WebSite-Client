import type { SVGProps } from 'react';
const SvgAlertFill = (props: SVGProps<SVGSVGElement>) => (
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
      d='m12.866 3.007 9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5l9.526-16.5a1 1 0 0 1 1.732 0m-1.866 13v2h2v-2zm0-7v5h2v-5z'
    />
  </svg>
);
export default SvgAlertFill;
