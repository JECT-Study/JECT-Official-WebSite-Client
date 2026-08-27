import type { SVGProps } from "react";
const SvgMousePointer = (props: SVGProps<SVGSVGElement>) => (
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
      d='M3.208 2.028c.288-.057.586-.027.857.085v-.001l16 6.5h.002c.255.105.476.277.64.497l.066.097.058.103a1.5 1.5 0 0 1-.954 2.145l-5.573 1.436 5.404 5.404a1 1 0 1 1-1.414 1.414l-5.404-5.404-1.437 5.572-.002.01a1.5 1.5 0 0 1-2.836.185l-.003-.006-6.5-16a1.5 1.5 0 0 1 .326-1.627c.21-.21.479-.353.77-.41m6.687 15.88 1.191-4.615a3 3 0 0 1 .772-1.39l.022-.023.018-.016a3 3 0 0 1 1.354-.768l4.658-1.201L4.41 4.41z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgMousePointer;
