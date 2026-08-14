import type { SVGProps } from "react";
const SvgPaperclip = (props: SVGProps<SVGSVGElement>) => (
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
      d='M16 1a5.001 5.001 0 0 1 3.535 8.537v-.001l-8.407 8.579-.007.008a3 3 0 0 1-4.243 0 3.003 3.003 0 0 1-.007-4.237L15.285 5.3a1 1 0 1 1 1.428 1.4l-8.414 8.586-.007.008a1.001 1.001 0 0 0 1.342 1.48l.073-.067 8.407-8.578.007-.007a3 3 0 0 0 0-4.243 3 3 0 0 0-4.243 0l-8.372 8.544-.013.013A5.002 5.002 0 0 0 9.021 21a5 5 0 0 0 3.544-1.494l8.377-8.548a1 1 0 0 1 1.428 1.399l-8.379 8.55v.003a7.003 7.003 0 0 1-11.464-2.244 7 7 0 0 1 1.564-7.656l8.366-8.538.007-.007A5 5 0 0 1 16 1'
    />
  </svg>
);
export default SvgPaperclip;
