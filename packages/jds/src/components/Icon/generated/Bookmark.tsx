import type { SVGProps } from "react";
const SvgBookmark = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 17.026c.522 0 1.035.137 1.488.396L18 20V5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v15l4.512-2.578A3 3 0 0 1 12 17.026M20 20a2 2 0 0 1-2.992 1.736l-4.512-2.578a1 1 0 0 0-.992 0l-4.512 2.578a2 2 0 0 1-2.988-1.605L4 20V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z'
    />
  </svg>
);
export default SvgBookmark;
