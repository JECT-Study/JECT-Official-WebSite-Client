import type { SVGProps } from "react";
const SvgHash = (props: SVGProps<SVGSVGElement>) => (
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
      d='M16.11 2.006a1 1 0 0 1 .884 1.104L16.451 8H20a1 1 0 0 1 0 2h-3.771l-.445 4H20a1 1 0 0 1 0 2h-4.438l-.568 5.11a1 1 0 0 1-1.988-.22l.543-4.89H9.562l-.568 5.11a1 1 0 0 1-1.988-.22L7.549 16H4a1 1 0 0 1 0-2h3.771l.445-4H4a1 1 0 0 1 0-2h4.438l.568-5.11a1 1 0 0 1 1.988.22L10.451 8h3.987l.568-5.11a1 1 0 0 1 1.104-.884M9.784 14h3.987l.445-4h-3.987z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgHash;
