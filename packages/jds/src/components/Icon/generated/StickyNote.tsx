import type { SVGProps } from "react";
const SvgStickyNote = (props: SVGProps<SVGSVGElement>) => (
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
      d='M15 2.001a3.4 3.4 0 0 1 2.413.998L21 6.586l.116.121A3.4 3.4 0 0 1 22 9v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9h-4a2 2 0 0 1-2-2V4zm11 4h3.586L16 4.414z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgStickyNote;
