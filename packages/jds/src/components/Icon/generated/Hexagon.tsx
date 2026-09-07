import type { SVGProps } from "react";
const SvgHexagon = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 1.001c.525 0 1.04.14 1.495.4h.001l7 4 .004.003A3 3 0 0 1 22 7.999V16a3 3 0 0 1-1.5 2.594l-.004.003-7 4a3 3 0 0 1-2.992 0l-7-4-.004-.003A3 3 0 0 1 2 16.001V7.998l.007-.198A3 3 0 0 1 3.5 5.404l.004-.003 7-4c.455-.262.97-.4 1.496-.4m0 2a1 1 0 0 0-.5.134l-.004.002L4.5 7.134l.001.001A1 1 0 0 0 4 8V16l.009.13a1 1 0 0 0 .487.732l7 4 .004.003a1 1 0 0 0 1 0l.004-.003 7-4a1 1 0 0 0 .496-.862V8l-.009-.13a1 1 0 0 0-.491-.735l-6.996-3.998-.004-.002a1 1 0 0 0-.5-.134'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgHexagon;
