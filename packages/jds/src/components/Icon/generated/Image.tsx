import type { SVGProps } from "react";
const SvgImage = (props: SVGProps<SVGSVGElement>) => (
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
      d='M9 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M19 2a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h.586l8.793-8.793.22-.2a3 3 0 0 1 4.022.2L20 12.586V5a1 1 0 0 0-1-1zm11.5 8.328a1 1 0 0 0-.634.227l-.073.066L8.414 20H19a1 1 0 0 0 1-1v-3.586l-2.793-2.793a1 1 0 0 0-.707-.293'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgImage;
