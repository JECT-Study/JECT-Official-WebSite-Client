import type { SVGProps } from 'react';
const SvgLayer = (props: SVGProps<SVGSVGElement>) => (
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
      d='m20.083 15.218 1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.068zm0-4.7 1.202.721a.5.5 0 0 1 0 .858L12 17.668l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.368zm-7.569-9.191 8.771 5.262a.5.5 0 0 1 0 .858L12 13.018 2.715 7.447a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0M12 3.35 5.887 7.018 12 10.686l6.113-3.668z'
    />
  </svg>
);
export default SvgLayer;
