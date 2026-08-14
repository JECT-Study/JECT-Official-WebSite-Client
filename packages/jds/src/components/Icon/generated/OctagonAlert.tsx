import type { SVGProps } from "react";
const SvgOctagonAlert = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12.007 15a1 1 0 1 1 0 2h-.01a1 1 0 1 1 0-2zM11.997 7a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M15.31 1a3 3 0 0 1 2.12.879l4.688 4.687.2.221a3 3 0 0 1 .68 1.9v6.626a3 3 0 0 1-.68 1.9l-.2.22-4.687 4.688A3 3 0 0 1 15.31 23H8.685a3 3 0 0 1-1.9-.68l-.222-.199-4.687-4.687a3 3 0 0 1-.879-2.122V8.689a3 3 0 0 1 .879-2.122L6.563 1.88l.221-.2A3 3 0 0 1 8.684 1zM8.686 3a1 1 0 0 0-.707.293L3.29 7.981a1 1 0 0 0-.293.707v6.624a1 1 0 0 0 .293.707l4.689 4.688a1 1 0 0 0 .707.293h6.623a1 1 0 0 0 .707-.293l4.688-4.688a1 1 0 0 0 .293-.707V8.688a1 1 0 0 0-.293-.707l-4.688-4.688A1 1 0 0 0 15.309 3z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgOctagonAlert;
