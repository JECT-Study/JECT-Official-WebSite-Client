import type { SVGProps } from "react";
const SvgCaseSensitive = (props: SVGProps<SVGSVGElement>) => (
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
      d='M6.611 6.005a1.5 1.5 0 0 1 1.274.92l4.038 9.69a1 1 0 0 1-1.846.768L9.084 15H3.917l-.994 2.384a1 1 0 0 1-1.846-.77l4.04-9.69.045-.1c.116-.23.291-.427.507-.57l.094-.058C5.987 6.069 6.242 6 6.5 6zM4.75 13h3.5L6.5 8.8zM22 9a1 1 0 0 1 1 1v7a1 1 0 0 1-1.975.223 4.5 4.5 0 1 1 0-7.45A1 1 0 0 1 22 9m-3.5 2a2.5 2.5 0 1 0 2.487 2.754L21 13.5l-.013-.255a2.5 2.5 0 0 0-2.487-2.245'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgCaseSensitive;
